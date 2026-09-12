import { useForm } from "react-hook-form";
import useDbUser from "../../../hooks/useDbUser";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const EmployeeProfileSetup = () => {
  const { dbUser, refetchDbUser } = useDbUser();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      employeeName: dbUser?.displayName,
      employeeEmail: dbUser?.email,
      employeeGender: "",
      employeePhoneNo: "",
      employeeDateOfBirth: "",
      employeeNID: "",
      employeeBloodGroup: "",
      employeePresentAddress: "",
      employeeCampus: "",
      employeeSection: "",
      employeeSubject: "",
      employeeJoiningDate: "",
      employeeDesignation: "",
    },
  });

  const employeeFormSubmit = async (data) => {
    try {
      const employeeProfileData = {
        ...data,
        employeePhoneNo: `880${data.employeePhoneNo}`,
        userId: dbUser._id,
        employeePhotoURL: dbUser?.photoURL || "",
      };

      Swal.fire({
        title: "Please check again before submission",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, save it!",
      }).then((result) => {
        if (result.isConfirmed)
          // Save the employee profile data to the database
          axiosSecure.post("/employees", employeeProfileData).then((res) => {
            if (res.data.employeeId) {
              refetchDbUser();
              navigate("/dashboard");

              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      });

      // const res = await axiosSecure
      //   .post("/teachers", teacherProfileData)
      //   .then((res) => {
      //     if (res.data.teacherId) {
      //       refetchDbUser();
      //       navigate("/dashboard");
      //     }
      //   });
      // console.log("after saving guardian profile", res);
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
          Employee Account Setup
        </span>

        <h3
          className="
            heading-font mt-4
            text-3xl font-black
            text-neutral
            sm:text-4xl
          "
        >
          Employee Profile Setup
        </h3>

        <p
          className="
            mx-auto mt-3 max-w-2xl
            text-sm leading-6
            text-base-content/55
            sm:text-base
          "
        >
          Complete your information and add your school details to continue your
          Cosmo School account setup.
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
        onSubmit={handleSubmit(employeeFormSubmit)}
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {/* =====================================================
              Employee Information
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
                Employee Information
              </h3>

              <p className="mt-2 text-sm leading-6 text-base-content/50">
                Please provide your personal and contact information.
              </p>
            </div>

            <fieldset className="fieldset space-y-1">
              {/* Employee name */}
              <label className="mb-1 text-sm font-bold text-neutral">
                Employee Name
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
                placeholder="Employee Name"
                {...register("employeeName", {
                  required: true,
                })}
                defaultValue={dbUser?.displayName}
              />

              {errors.employeeName && (
                <span
                  className="
                    -mt-2 mb-3
                    text-sm font-semibold
                    text-error
                  "
                >
                  Employee name is required
                </span>
              )}

              {/* Employee Email */}
              <label className="mb-1 text-sm font-bold text-neutral">
                Employee Email
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
                placeholder="Employee Email"
                {...register("employeeEmail", {
                  required: true,
                })}
                defaultValue={dbUser?.email}
                readOnly
              />

              {errors.employeeEmail && (
                <span
                  className="
                    -mt-2 mb-3
                    text-sm font-semibold
                    text-error
                  "
                >
                  Employee email is required
                </span>
              )}

              {/* employee gender */}
              <fieldset className="fieldset mb-3">
                <legend className="mb-1 text-sm font-bold text-neutral">
                  Employee Gender
                </legend>

                <select
                  {...register("employeeGender", {
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

                {errors.employeeGender && (
                  <span className="mt-1 text-sm font-semibold text-error">
                    Employee gender is required
                  </span>
                )}
              </fieldset>

              {/* Employee Phone no */}
              <label className="mb-1 text-sm font-bold text-neutral">
                Employee Phone No.{" "}
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
                    ${errors.employeePhoneNo ? "input-error" : ""}
                  `}
                  placeholder="1712345678"
                  maxLength={10}
                  {...register("employeePhoneNo", {
                    required: "Phone number is required",

                    pattern: {
                      value: /^1[3-9]\d{8}$/,
                      message: "Enter a valid Bangladeshi mobile number",
                    },
                  })}
                />
              </div>

              {errors.employeePhoneNo && (
                <span className="mt-1 text-sm font-semibold text-error">
                  {errors.employeePhoneNo.message}
                </span>
              )}

              {/* Employee Date of Birth */}
              <label className="mb-1 mt-2 text-sm font-bold text-neutral">
                Employee Date of Birth
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
                {...register("employeeDateOfBirth", {
                  required: "Date of birth is required",
                })}
              />

              {errors.employeeDateOfBirth && (
                <span className="mt-1 text-sm font-semibold text-error">
                  {errors.employeeDateOfBirth.message}
                </span>
              )}

              {/* Employee NID */}
              <label className="mb-1 mt-2 text-sm font-bold text-neutral">
                Employee NID
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

                {errors.employeeBloodGroup && (
                  <span className="mt-1 text-sm font-semibold text-error">
                    Employee blood group is required
                  </span>
                )}
              </fieldset>

              {/* Employee present address */}
              <label className="my-1 text-sm font-bold text-neutral">
                Employee Present Address
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
                placeholder="Employee present address"
                {...register("employeePresentAddress", {
                  required: true,
                })}
              />

              {errors.employeePresentAddress && (
                <span
                  className="
                    -mt-2 mb-3
                    text-sm font-semibold
                    text-error
                  "
                >
                  Employee present address is required
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
                {...register("employeeCampus", {
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

              {errors.employeeCampus && (
                <span className="mt-1 text-sm font-semibold text-error">
                  Employee campus is required
                </span>
              )}
            </fieldset>

            {/* employee section */}
            <fieldset className="fieldset space-y-1">
              <fieldset className="fieldset mb-3">
                <legend className="mb-1 text-sm font-bold text-neutral">
                  Select Your Section
                </legend>

                <select
                  {...register("employeeSection", {
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

                  <option>Administration</option>
                  <option>Pre-School </option>
                  <option>Junior (Prep-I to Class-II)</option>
                  <option>Middle (Class-III to Class-V)</option>
                  <option>Senior (Class-VI to Class-X)</option>
                </select>

                {errors.employeeSection && (
                  <span className="mt-1 text-sm font-semibold text-error">
                    Employee section is required
                  </span>
                )}
              </fieldset>
            </fieldset>

            {/* employee   subject */}
            <fieldset className="fieldset space-y-1">
              <fieldset className="fieldset mb-3">
                <legend className="mb-1 text-sm font-bold text-neutral">
                  Select Your Subject
                </legend>

                <select
                  {...register("employeeSubject", {
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

                  <option>None</option>
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
                </select>

                {errors.employeeSubject && (
                  <span className="mt-1 text-sm font-semibold text-error">
                    Employee subject is required
                  </span>
                )}
              </fieldset>

              {/* Employee Joining Date */}
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
                {...register("employeeJoiningDate", {
                  required: "Joining date is required",
                })}
              />

              {errors.employeeJoiningDate && (
                <span className="mt-1 text-sm font-semibold text-error">
                  {errors.employeeJoiningDate.message}
                </span>
              )}
            </fieldset>

            {/* employee section */}
            <fieldset className="fieldset space-y-1">
              <fieldset className="fieldset mb-3">
                <legend className="mb-1 text-sm font-bold text-neutral">
                  Your Role or Designation
                </legend>

                <select
                  {...register("employeeRole", {
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
                    Choose Your Role
                  </option>

                  <option value="teacher">Teacher</option>
                  <option value="teacher">Responsible Teacher </option>
                  <option value="admin">Principal</option>
                  <option value="admin">Vice Principal</option>
                  <option value="admin">Admin</option>
                </select>

                {errors.employeeRole && (
                  <span className="mt-1 text-sm font-semibold text-error">
                    Employee role is required
                  </span>
                )}
              </fieldset>
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

export default EmployeeProfileSetup;
