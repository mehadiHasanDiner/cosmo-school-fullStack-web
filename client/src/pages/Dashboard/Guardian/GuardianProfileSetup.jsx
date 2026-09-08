import { useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useDbUser from "../../../hooks/usedbUser";
import { useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";

const GuardianProfileSetup = () => {
  const { dbUser, refetchDbUser } = useDbUser();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      guardianName: dbUser?.name,
      guardianEmail: dbUser?.email,
      guardianCampus: "",
      guardianGender: "",
      guardianProfession: "",
      guardianPresentAddress: "",
      guardianPhoneNo: "",

      // initially one child
      children: [
        {
          childName: "",
          childStudentId: "",
          childClass: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  const guardianFormSubmit = async (data) => {
    try {
      const guardianData = {
        ...data,
        guardianPhoneNo: `880${data.guardianPhoneNo}`,
        userId: dbUser._id,
      };

      Swal.fire({
        title: "Please check again before submission",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Save it!",
      }).then((result) => {
        if (result.isConfirmed) {
          axiosSecure.post("/guardians", guardianData).then((res) => {
            console.log("after saving guardian profile", res.data);
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${res.data?.message}`,
              showConfirmButton: false,
              timer: 2500,
              background: "#03373D",
              color: "#fff",
            });
            refetchDbUser();
            navigate("/dashboard/link-student");
          });
        }
      });

      const res = console.log(res);

      // if (result.data.success) {
      //   await refetchDbUser();
      //   navigate("/dashboard/link-student");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddChild = () => {
    append({
      childName: "",
      childStudentId: "",
      childClass: "",
    });
  };

  return (
    <div
      className="
        body-font min-h-screen w-full
        bg-linear-to-br
        from-base-200/60
        via-base-100
        to-primary/6
        px-4 py-8
        sm:px-6 sm:py-10
        lg:px-8
      "
    >
      {/* Page Heading */}
      <div className="mx-auto max-w-5xl text-center">
        <span
          className="
            inline-flex rounded-full
            border border-primary/20
            bg-primary/10
            px-4 py-2
            text-xs font-black uppercase
            tracking-[0.18em] text-primary
          "
        >
          Guardian Account Setup
        </span>

        <h3
          className="
            heading-font mt-4
            text-3xl font-black
            text-neutral
            sm:text-4xl
          "
        >
          Guardian Profile Setup
        </h3>

        <p
          className="
            mx-auto mt-3 max-w-2xl
            text-sm leading-6
            text-base-content/55
            sm:text-base
          "
        >
          Complete your guardian information and add your child's school details
          to continue your Cosmo School account setup.
        </p>

        {/* Cosmo small divider */}
        <div
          className="
            mx-auto mt-5 h-1 w-20
            rounded-full
            bg-linear-to-r
            from-primary via-secondary to-accent
          "
        />
      </div>

      <form
        className="
          relative mx-auto mt-8 max-w-5xl
          overflow-hidden rounded-[28px]
          border border-primary/15
          bg-base-100
          p-5
          shadow-[0_25px_70px_rgba(39,140,69,0.12)]
          sm:p-7
          lg:p-9
        "
        onSubmit={handleSubmit(guardianFormSubmit)}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {/* =====================================================
              Guardian Information
          ====================================================== */}
          <div
            className="
              rounded-3xl
              border border-primary/15
              bg-linear-to-br
              from-primary/4.5
              via-base-100
              to-base-100
              p-5
              sm:p-6
            "
          >
            <div className="mb-6">
              <p
                className="
                  text-xs font-black uppercase
                  tracking-[0.16em] text-primary
                "
              >
                Step 01
              </p>

              <h3
                className="
                  mt-1 text-xl font-black
                  text-neutral
                  sm:text-2xl
                "
              >
                Guardian Information
              </h3>

              <p className="mt-2 text-sm leading-6 text-base-content/50">
                Please provide your personal and contact information.
              </p>
            </div>

            <fieldset className="fieldset space-y-1">
              {/* Guardian name */}
              <label className="mb-1 text-sm font-bold text-neutral">
                Guardian Name
              </label>

              <input
                type="text"
                className="
                  input input-bordered
                  mb-3 h-13 w-full
                  rounded-xl
                  border-base-300
                  bg-base-100
                  px-4
                  text-neutral
                  shadow-sm
                  transition-all duration-300
                  placeholder:text-base-content/35
                  hover:border-primary/40
                  focus:border-primary
                  focus:outline-none
                  focus:ring-4
                  focus:ring-primary/10
                "
                placeholder="Guardian Name"
                {...register("guardianName", {
                  required: true,
                })}
                defaultValue={dbUser?.displayName}
              />

              {errors.guardianName && (
                <span
                  className="
                    -mt-2 mb-3
                    text-sm font-semibold
                    text-error
                  "
                >
                  Guardian name is required
                </span>
              )}

              {/* Guardian Email */}
              <label className="mb-1 text-sm font-bold text-neutral">
                Guardian Email
              </label>

              <input
                type="text"
                className="
                  input input-bordered
                  mb-3 h-13 w-full
                  cursor-not-allowed
                  rounded-xl
                  border-base-300
                  bg-base-200/70
                  px-4
                  text-base-content/60
                  shadow-sm
                  focus:border-base-300
                  focus:outline-none
                "
                placeholder="Guardian Email"
                {...register("guardianEmail", {
                  required: true,
                })}
                defaultValue={dbUser?.email}
                readOnly
              />

              {errors.guardianEmail && (
                <span
                  className="
                    -mt-2 mb-3
                    text-sm font-semibold
                    text-error
                  "
                >
                  Guardian email is required
                </span>
              )}

              {/* choose campus */}
              <fieldset className="fieldset mb-3">
                <legend className="mb-1 text-sm font-bold text-neutral">
                  Select Preferred Campus
                </legend>

                <select
                  defaultValue="Select Campus"
                  {...register("guardianCampus", {
                    required: true,
                  })}
                  className="
                    select select-bordered
                    h-13 w-full
                    rounded-xl
                    border-base-300
                    bg-base-100
                    px-4
                    text-neutral
                    shadow-sm
                    transition-all duration-300
                    hover:border-primary/40
                    focus:border-primary
                    focus:outline-none
                    focus:ring-4
                    focus:ring-primary/10
                  "
                >
                  <option value="" disabled>
                    Select Campus
                  </option>

                  <option>Mirpur</option>
                  <option>Banasree</option>
                </select>

                {errors.guardianCampus && (
                  <span className="mt-1 text-sm font-semibold text-error">
                    Guardian campus is required
                  </span>
                )}
              </fieldset>

              {/* guardian gender */}
              <fieldset className="fieldset mb-3">
                <legend className="mb-1 text-sm font-bold text-neutral">
                  Guardian Gender
                </legend>

                <select
                  {...register("guardianGender", {
                    required: true,
                  })}
                  defaultValue="Select Gender"
                  className="
                    select select-bordered
                    h-13 w-full
                    rounded-xl
                    border-base-300
                    bg-base-100
                    px-4
                    text-neutral
                    shadow-sm
                    transition-all duration-300
                    hover:border-primary/40
                    focus:border-primary
                    focus:outline-none
                    focus:ring-4
                    focus:ring-primary/10
                  "
                >
                  <option value="" disabled>
                    Select Gender
                  </option>

                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>

                {errors.guardianGender && (
                  <span className="mt-1 text-sm font-semibold text-error">
                    Guardian gender is required
                  </span>
                )}
              </fieldset>

              {/* guardian profession */}
              <fieldset className="fieldset mb-3">
                <legend className="mb-1 text-sm font-bold text-neutral">
                  Guardian Profession
                </legend>

                <select
                  {...register("guardianProfession", {
                    required: true,
                  })}
                  defaultValue="Select a Profession"
                  className="
                    select select-bordered
                    h-13 w-full
                    rounded-xl
                    border-base-300
                    bg-base-100
                    px-4
                    text-neutral
                    shadow-sm
                    transition-all duration-300
                    hover:border-primary/40
                    focus:border-primary
                    focus:outline-none
                    focus:ring-4
                    focus:ring-primary/10
                  "
                >
                  <option value="" disabled>
                    Select a Profession
                  </option>

                  <option>Businessman</option>
                  <option>Teacher</option>
                  <option>Doctor</option>
                  <option>Engineer</option>
                  <option>Public Job </option>
                  <option>Private Job </option>
                  <option>Housewife</option>
                  <option>Other</option>
                </select>

                {errors.guardianProfession && (
                  <span className="mt-1 text-sm font-semibold text-error">
                    Guardian profession is required
                  </span>
                )}
              </fieldset>

              {/* Guardian present address */}
              <label className="mb-1 text-sm font-bold text-neutral">
                Guardian Present Address
              </label>

              <input
                type="text"
                className="
                  input input-bordered
                  mb-3 h-13 w-full
                  rounded-xl
                  border-base-300
                  bg-base-100
                  px-4
                  text-neutral
                  shadow-sm
                  transition-all duration-300
                  placeholder:text-base-content/35
                  hover:border-primary/40
                  focus:border-primary
                  focus:outline-none
                  focus:ring-4
                  focus:ring-primary/10
                "
                placeholder="Guardian present address"
                {...register("guardianPresentAddress", {
                  required: true,
                })}
              />

              {errors.guardianPresentAddress && (
                <span
                  className="
                    -mt-2 mb-3
                    text-sm font-semibold
                    text-error
                  "
                >
                  Guardian present address is required
                </span>
              )}

              {/* Guardian Phone no */}
              <label className="mb-1 text-sm font-bold text-neutral">
                Guardian Phone No.{" "}
                <span className="font-medium text-base-content/45">
                  (Preferred WhatsApp no.)
                </span>
              </label>

              <div
                className="
                  join w-full overflow-hidden
                  rounded-xl
                  border border-base-300
                  bg-base-100
                  shadow-sm
                  transition-all duration-300
                  focus-within:border-primary
                  focus-within:ring-4
                  focus-within:ring-primary/10
                "
              >
                <span
                  className="
                    join-item flex
                    items-center
                    border-none
                    bg-primary/10
                    px-4
                    font-black
                    text-primary
                  "
                >
                  +880
                </span>

                <input
                  type="tel"
                  className={`
                    input join-item
                    h-13 w-full
                    border-none
                    bg-base-100
                    px-4
                    text-neutral
                    focus:outline-none
                    ${errors.guardianPhoneNo ? "input-error" : ""}
                  `}
                  placeholder="1712345678"
                  maxLength={10}
                  {...register("guardianPhoneNo", {
                    required: "Phone number is required",

                    pattern: {
                      value: /^1[3-9]\d{8}$/,
                      message: "Enter a valid Bangladeshi mobile number",
                    },
                  })}
                />
              </div>

              {errors.guardianPhoneNo && (
                <span className="mt-1 text-sm font-semibold text-error">
                  {errors.guardianPhoneNo.message}
                </span>
              )}
            </fieldset>
          </div>

          {/* =====================================================
              Children Information
          ====================================================== */}
          <div
            className="
              rounded-3xl
              border border-secondary/30
              bg-linear-to-br
              from-secondary/8
              via-base-100
              to-base-100
              p-5
              sm:p-6
            "
          >
            <div className="mb-6">
              <p
                className="
                  text-xs font-black uppercase
                  tracking-[0.16em] text-primary
                "
              >
                Step 02
              </p>

              <h3
                className="
                  mt-1 text-xl font-black
                  text-neutral
                  sm:text-2xl
                "
              >
                Add Your Child's Information
              </h3>

              <p className="mt-2 text-sm leading-6 text-base-content/50">
                Add one or more children using the information provided by Cosmo
                School.
              </p>
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="
                  group relative
                  mb-5 overflow-hidden
                  rounded-2xl
                  border border-primary/15
                  bg-base-100
                  p-5
                  shadow-[0_12px_30px_rgba(0,0,0,0.05)]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-primary/30
                  hover:shadow-[0_18px_40px_rgba(39,140,69,0.10)]
                "
              >
                <div
                  className="
                    absolute inset-x-0 top-0
                    h-1
                    bg-linear-to-r
                    from-primary
                    via-secondary
                    to-accent
                  "
                />

                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary/70">
                      Student Information
                    </p>

                    <h4 className="mt-1 text-lg font-black text-neutral">
                      Child {index + 1}
                    </h4>
                  </div>

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="
                        btn btn-sm
                        rounded-xl
                        border border-error/20
                        bg-error/10
                        font-bold
                        text-error
                        shadow-none
                        transition-all duration-300
                        hover:border-error
                        hover:bg-error
                        hover:text-white
                      "
                    >
                      Remove
                    </button>
                  )}
                </div>

                <fieldset className="fieldset space-y-1">
                  {/* Child Name */}
                  <label className="mb-1 text-sm font-bold text-neutral">
                    Your Child Name
                  </label>

                  <input
                    type="text"
                    className="
                      input input-bordered
                      h-13 w-full
                      rounded-xl
                      border-base-300
                      bg-base-100
                      px-4
                      text-neutral
                      shadow-sm
                      transition-all duration-300
                      placeholder:text-base-content/35
                      hover:border-primary/40
                      focus:border-primary
                      focus:outline-none
                      focus:ring-4
                      focus:ring-primary/10
                    "
                    placeholder="Your Child Name"
                    {...register(`children.${index}.childName`, {
                      required: true,
                    })}
                  />

                  {errors.children?.[index]?.childName && (
                    <span className="mb-2 text-sm font-semibold text-error">
                      Child name is required
                    </span>
                  )}

                  {/* Student ID */}
                  <label className="mb-1 mt-2 text-sm font-bold text-neutral">
                    Your Child Student ID
                  </label>

                  <input
                    type="text"
                    className="
                      input input-bordered
                      h-13 w-full
                      rounded-xl
                      border-base-300
                      bg-base-100
                      px-4
                      text-neutral
                      shadow-sm
                      transition-all duration-300
                      placeholder:text-base-content/35
                      hover:border-primary/40
                      focus:border-primary
                      focus:outline-none
                      focus:ring-4
                      focus:ring-primary/10
                    "
                    placeholder="Your Child Student ID"
                    {...register(`children.${index}.childStudentId`, {
                      required: "Student IDis required",

                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Only numbers are allowed",
                      },
                    })}
                  />

                  {errors.children?.[index]?.childStudentId && (
                    <span className="mb-2 text-sm font-semibold text-error">
                      {errors.children[index].childStudentId.message}
                    </span>
                  )}

                  {/* Class */}
                  <fieldset className="fieldset mt-2">
                    <legend className="mb-1 text-sm font-bold text-neutral">
                      Your Child's Class
                    </legend>

                    <select
                      {...register(`children.${index}.childClass`, {
                        required: true,
                      })}
                      className="
                        select select-bordered
                        h-13 w-full
                        rounded-xl
                        border-base-300
                        bg-base-100
                        px-4
                        text-neutral
                        shadow-sm
                        transition-all duration-300
                        hover:border-primary/40
                        focus:border-primary
                        focus:outline-none
                        focus:ring-4
                        focus:ring-primary/10
                      "
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Select Class
                      </option>

                      <option value="Pre-School">Pre-School</option>

                      <option value="Prep One">Prep One</option>

                      <option value="Prep Two">Prep Two</option>

                      <option value="Class One">Class One</option>

                      <option value="Class Two">Class Two</option>

                      <option value="Class Three">Class Three</option>

                      <option value="Class Four">Class Four</option>

                      <option value="Class Five">Class Five</option>

                      <option value="Class Six">Class Six</option>

                      <option value="Class Seven">Class Seven</option>

                      <option value="Class Eight">Class Eight</option>

                      <option value="Class Nine">Class Nine</option>

                      <option value="Class Ten">Class Ten</option>
                    </select>

                    {errors.children?.[index]?.childClass && (
                      <span className="mt-1 text-sm font-semibold text-error">
                        Child class is required
                      </span>
                    )}
                  </fieldset>
                </fieldset>
              </div>
            ))}

            {/* Add Child */}
            <button
              type="button"
              className="
                btn min-h-13 w-full
                rounded-xl
                border border-secondary
                bg-secondary
                font-black
                text-neutral
                shadow-[0_10px_25px_rgba(244,197,24,0.20)]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-primary
                hover:bg-primary
                hover:text-white
                hover:shadow-[0_14px_30px_rgba(39,140,69,0.20)]
                active:translate-y-0
              "
              onClick={handleAddChild}
            >
              + Add Child {fields.length + 1}
            </button>
          </div>
        </div>

        {/* =====================================================
            Submit Area
        ====================================================== */}
        <div
          className="
            mt-8 flex flex-col
            gap-4 rounded-2xl
            border border-primary/10
            bg-primary/[0.035]
            p-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <h4 className="font-black text-neutral">Ready to continue?</h4>

            <p className="mt-1 text-sm text-base-content/50">
              Please review your information before saving your profile.
            </p>
          </div>

          <input
            type="submit"
            className="
              btn min-h-13
              cursor-pointer
              rounded-xl
              border-none
              bg-primary
              px-8
              font-black
              text-white
              shadow-[0_12px_30px_rgba(39,140,69,0.24)]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-primary/90
              hover:shadow-[0_16px_36px_rgba(39,140,69,0.30)]
              active:translate-y-0
              active:scale-[0.98]
            "
            value="Save Profile"
          />
        </div>
      </form>
    </div>
  );
};

export default GuardianProfileSetup;
