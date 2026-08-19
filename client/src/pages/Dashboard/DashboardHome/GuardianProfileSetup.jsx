import useDbUser from "../../../hooks/usedbUser";
import { useFieldArray, useForm } from "react-hook-form";

const GuardianProfileSetup = () => {
  const { dbUser } = useDbUser();
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
      children: [{ childName: "", childStudentId: "", childCampus: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "children",
  });

  const guardianFormSubmit = (data) => {
    console.log(data);
  };

  const handleAddChild = () => {
    append({ childName: "", childStudentId: "", childCampus: "" });
  };

  return (
    <div className="w-full h-full body-font">
      <h3 className="text-3xl font-bold text-center heading-font">
        Guardian Profile Setup
      </h3>

      <form
        className="max-w-5xl mx-auto bg-gray-200 p-8 rounded-lg  shadow-lg mt-4"
        onSubmit={handleSubmit(guardianFormSubmit)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            {/* ================= Guardian Information ================= */}
            <h3 className="text-xl font-semibold mb-2">Guardian Information</h3>
            <fieldset className="fieldset ‍ space-y-1">
              {/* Guardian name */}
              <label>Guardian Name</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Guardian Name"
                {...register("guardianName", { required: true })}
                defaultValue={dbUser?.name}
              />
              {errors.guardianName && (
                <span className="text-red-500 text-sm">
                  Guardian name is required
                </span>
              )}
              {/* Guardian Email */}
              <label>Guardian Email</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Guardian Email"
                {...register("guardianEmail", { required: true })}
                defaultValue={dbUser?.email}
                readOnly
              />
              {errors.guardianEmail && (
                <span className="text-red-500 text-sm">
                  Guardian email is required
                </span>
              )}

              {/* choose campus */}
              <fieldset className="fieldset">
                <legend className="">Select Preferred Campus</legend>
                <select
                  defaultValue="Select Campus"
                  {...register("guardianCampus", { required: true })}
                  className="select"
                >
                  <option value="" disabled>
                    Select Campus
                  </option>
                  <option>Mirpur</option>
                  <option>Banasree</option>
                </select>
                {errors.guardianCampus && (
                  <span className="text-red-500 text-sm">
                    Guardian campus is required
                  </span>
                )}
              </fieldset>

              {/* guardian region */}
              <fieldset className="fieldset">
                <legend className="">Guardian Gender</legend>
                <select
                  {...register("guardianGender", { required: true })}
                  defaultValue="Select Gender"
                  className="select"
                >
                  <option value="" disabled>
                    Select Gender
                  </option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                {errors.guardianGender && (
                  <span className="text-red-500 text-sm">
                    Guardian gender is required
                  </span>
                )}
              </fieldset>

              {/* guardian profession */}
              <fieldset className="fieldset">
                <legend className="">Guardian Profession</legend>
                <select
                  {...register("guardianProfession", { required: true })}
                  defaultValue="Select a Profession"
                  className="select"
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
                  <span className="text-red-500 text-sm">
                    Guardian profession is required
                  </span>
                )}
              </fieldset>

              {/* Guardian present address */}
              <label className="">Guardian Present Address</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Guardian present address"
                {...register("guardianPresentAddress", { required: true })}
              />
              {errors.guardianPresentAddress && (
                <span className="text-red-500 text-sm">
                  Guardian present address is required
                </span>
              )}
              {/* Guardian Phone no */}
              <label className="">Guardian Phone No.</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Guardian Phone number"
                {...register("guardianPhoneNo", { required: true })}
              />
              {errors.guardianPhoneNo && (
                <span className="text-red-500 text-sm">
                  Guardian phone number is required
                </span>
              )}
            </fieldset>
          </div>

          {/* ================= Children Information ================= */}
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Add your child's information
            </h3>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="border border-gray-300 rounded-lg p-4 mb-3 bg-white"
              >
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-lg">Child {index + 1}</h4>

                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="btn btn-error btn-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                <fieldset className="fieldset">
                  {/* Child Name */}
                  <label>Your Child Name</label>

                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Your Child Name"
                    {...register(`children.${index}.childName`, {
                      required: true,
                    })}
                  />
                  {errors.children?.[index]?.childName && (
                    <span className="text-red-500 text-sm">
                      Child name is required
                    </span>
                  )}

                  {/* Student ID */}
                  <label className="mt-3">Your Child Student ID</label>

                  <input
                    type="text"
                    className="input w-full"
                    placeholder="Your Child Student ID"
                    {...register(`children.${index}.childStudentId`, {
                      required: true,
                    })}
                  />
                  {errors.children?.[index]?.childStudentId && (
                    <span className="text-red-500 text-sm">
                      Child student ID is required
                    </span>
                  )}

                  {/* Class */}
                  <fieldset className="fieldset">
                    <legend className="fieldset-legend">
                      Your Child's Class
                    </legend>

                    <select
                      {...register(`children.${index}.class`, {
                        required: true,
                      })}
                      className="select w-full"
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
                    {errors.children?.[index]?.class && (
                      <span className="text-red-500 text-sm">
                        Child class is required
                      </span>
                    )}
                  </fieldset>
                </fieldset>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-secondary block ml-auto w-full"
              onClick={handleAddChild}
            >
              + Add child {fields.length + 1}
            </button>
          </div>
        </div>

        <input
          type="submit"
          className="btn btn-primary mt-4 block ml-auto"
          value="Save Profile"
        />
      </form>
    </div>
  );
};

export default GuardianProfileSetup;
