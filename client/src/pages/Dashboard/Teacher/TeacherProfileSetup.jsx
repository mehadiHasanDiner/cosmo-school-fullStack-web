import { useForm } from "react-hook-form";
import useDbUser from "../../../hooks/useDbUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const TeacherProfileSetup = () => {
  const { dbUser, refetchDbUser } = useDbUser();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      teacherName: dbUser?.displayName,
      teacherEmail: dbUser?.email,
      teacherGender: "",
      teacherPhoneNo: "",
      teacherDateOfBirth: "",
      teacherNID: "",
      teacherBloodGroup: "",
      teacherPresentAddress: "",
      teacherCampus: "",
      teacherSection: "",
      teacherSubject: "",
      teacherJoiningDate: "",
    },
  });

  const teacherFormSubmit = async (data) => {
    try {
      const teacherProfileData = {
        ...data,
        teacherPhoneNo: `880${data.teacherPhoneNo}`,
        userId: dbUser._id,
        teacherPhoto: dbUser?.photoURL || "",
      };

      const res = await axiosSecure
        .post("/teachers", teacherProfileData)
        .then((res) => {
          if (res.data.teacherId) {
            refetchDbUser();
            navigate("/dashboard");
            Swal.fire({
              position: "center",
              icon: "success",
              title: `${res.data?.message}`,
              showConfirmButton: false,
              timer: 2500,
              background: "#03373D",
              color: "#fff",
            });
          }
        });
      console.log("after saving guardian profile", res);
    } catch (error) {
      console.error("Error submitting teacher profile:", error);
    }
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
          Teacher Account Setup
        </span>

        <h3
          className="
            heading-font mt-4
            text-3xl font-black
            text-neutral
            sm:text-4xl
          "
        >
          Teacher Profile Setup
        </h3>

        <p
          className="
            mx-auto mt-3 max-w-2xl
            text-sm leading-6
            text-base-content/55
            sm:text-base
          "
        >
          Complete your teacher information and add your school details to
          continue your Cosmo School account setup.
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
        onSubmit={handleSubmit(teacherFormSubmit)}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {/* =====================================================
              Teacher Information
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
                Step 01 (Basic)
              </p>

              <h3
                className="
                  mt-1 text-xl font-black
                  text-neutral
                  sm:text-2xl
                "
              >
                Teacher Information
              </h3>

              <p className="mt-2 text-sm leading-6 text-base-content/50">
                Please provide your personal and contact information.
              </p>
            </div>

            <fieldset className="fieldset space-y-1">
              {/* Teacher name */}
              <label className="mb-1 text-sm font-bold text-neutral">
                Teacher Name
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
                placeholder="Teacher Name"
                {...register("teacherName", {
                  required: true,
                })}
                defaultValue={dbUser?.displayName}
              />

              {errors.teacherName && (
                <span
                  className="
                    -mt-2 mb-3
                    text-sm font-semibold
                    text-error
                  "
                >
                  Teacher name is required
                </span>
              )}

              {/* Teacher Email */}
              <label className="mb-1 text-sm font-bold text-neutral">
                Teacher Email
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
                placeholder="Teacher Email"
                {...register("teacherEmail", {
                  required: true,
                })}
                defaultValue={dbUser?.email}
                readOnly
              />

              {errors.teacherEmail && (
                <span
                  className="
                    -mt-2 mb-3
                    text-sm font-semibold
                    text-error
                  "
                >
                  Teacher email is required
                </span>
              )}

              {/* teacher gender */}
              <fieldset className="fieldset mb-3">
                <legend className="mb-1 text-sm font-bold text-neutral">
                  Teacher Gender
                </legend>

                <select
                  {...register("teacherGender", {
                    required: true,
                  })}
                  defaultValue=""
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

                {errors.teacherGender && (
                  <span className="mt-1 text-sm font-semibold text-error">
                    Teacher gender is required
                  </span>
                )}
              </fieldset>

              {/* Teacher Phone no */}
              <label className="mb-1 text-sm font-bold text-neutral">
                Teacher Phone No.{" "}
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
                    ${errors.teacherPhoneNo ? "input-error" : ""}
                  `}
                  placeholder="1712345678"
                  maxLength={10}
                  {...register("teacherPhoneNo", {
                    required: "Phone number is required",

                    pattern: {
                      value: /^1[3-9]\d{8}$/,
                      message: "Enter a valid Bangladeshi mobile number",
                    },
                  })}
                />
              </div>

              {errors.teacherPhoneNo && (
                <span className="mt-1 text-sm font-semibold text-error">
                  {errors.teacherPhoneNo.message}
                </span>
              )}

              {/* Teacher Date of Birth */}
              <label className="mb-1 mt-2 text-sm font-bold text-neutral">
                Teacher Date of Birth
              </label>

              <input
                type="date"
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
                {...register("teacherDateOfBirth", {
                  required: "Date of birth is required",
                })}
              />

              {errors.teacherDateOfBirth && (
                <span className="mt-1 text-sm font-semibold text-error">
                  {errors.teacherDateOfBirth.message}
                </span>
              )}

              {/* Teacher NID */}
              <label className="mb-1 mt-2 text-sm font-bold text-neutral">
                Teacher NID
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
                placeholder="Teacher NID"
                {...register("teacherNID", {
                  required: "Teacher NID is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Only numbers are allowed",
                  },
                })}
              />

              {errors.teacherNID && (
                <span className="mb-2 text-sm font-semibold text-error">
                  {errors.teacherNID.message}
                </span>
              )}

              {/* teacher blood group */}
              <fieldset className="fieldset mb-3">
                <legend className="mb-1 text-sm font-bold text-neutral">
                  Teacher Blood Group
                </legend>

                <select
                  {...register("teacherBloodGroup", {
                    required: true,
                  })}
                  defaultValue=""
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
                    Select Blood Group
                  </option>

                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>

                {errors.teacherBloodGroup && (
                  <span className="mt-1 text-sm font-semibold text-error">
                    Teacher blood group is required
                  </span>
                )}
              </fieldset>

              {/* Teacher present address */}
              <label className="my-1 text-sm font-bold text-neutral">
                Teacher Present Address
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
                placeholder="Teacher present address"
                {...register("teacherPresentAddress", {
                  required: true,
                })}
              />

              {errors.teacherPresentAddress && (
                <span
                  className="
                    -mt-2 mb-3
                    text-sm font-semibold
                    text-error
                  "
                >
                  Teacher present address is required
                </span>
              )}
            </fieldset>
          </div>

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
                Step 02 (Job details)
              </p>

              <h3
                className="
                  mt-1 text-xl font-black
                  text-neutral
                  sm:text-2xl
                "
              >
                Add Your Job Details
              </h3>

              <p className="mt-2 text-sm leading-6 text-base-content/50">
                Add your job details and select your campus to continue your
                Cosmo School account setup.
              </p>
            </div>

            {/* choose campus */}
            <fieldset className="fieldset mb-3">
              <legend className="mb-1 text-sm font-bold text-neutral">
                Select Your Campus
              </legend>

              <select
                defaultValue=""
                {...register("teacherCampus", {
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

              {errors.teacherCampus && (
                <span className="mt-1 text-sm font-semibold text-error">
                  Teacher campus is required
                </span>
              )}
            </fieldset>

            {/* teacher section */}
            <fieldset className="fieldset space-y-1">
              <fieldset className="fieldset mb-3">
                <legend className="mb-1 text-sm font-bold text-neutral">
                  Select Your Section
                </legend>

                <select
                  {...register("teacherSection", {
                    required: true,
                  })}
                  defaultValue=""
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
                    Select Your section
                  </option>

                  <option>Pre-School </option>
                  <option>Junior (Prep-I to Class-II)</option>
                  <option>Middle (Class-III to Class-V)</option>
                  <option>Senior (Class-VI to Class-X)</option>
                </select>

                {errors.teacherSection && (
                  <span className="mt-1 text-sm font-semibold text-error">
                    Teacher section is required
                  </span>
                )}
              </fieldset>
            </fieldset>

            {/* teacher subject */}
            <fieldset className="fieldset space-y-1">
              <fieldset className="fieldset mb-3">
                <legend className="mb-1 text-sm font-bold text-neutral">
                  Select Your Subject
                </legend>

                <select
                  {...register("teacherSubject", {
                    required: true,
                  })}
                  defaultValue=""
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
                    Select Your Subject
                  </option>

                  <option>Bangla</option>
                  <option>English</option>
                  <option>Math</option>
                  <option>Science</option>
                  <option>BGS</option>
                  <option>ICT</option>
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Biology</option>
                  <option>Islam Religion</option>
                  <option>Hindu Religion & Others</option>
                  <option>Arts</option>
                  <option>Music</option>
                  <option>Physical Education</option>
                  <option>Others</option>
                </select>

                {errors.teacherSubject && (
                  <span className="mt-1 text-sm font-semibold text-error">
                    Teacher subject is required
                  </span>
                )}
              </fieldset>

              {/* Teacher Joining Date */}
              <label className="mb-1 mt-1 text-sm font-bold text-neutral">
                Your Joining Date
              </label>

              <input
                type="date"
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
                {...register("teacherJoiningDate", {
                  required: "Joining date is required",
                })}
              />

              {errors.teacherJoiningDate && (
                <span className="mt-1 text-sm font-semibold text-error">
                  {errors.teacherJoiningDate.message}
                </span>
              )}
            </fieldset>
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

export default TeacherProfileSetup;
