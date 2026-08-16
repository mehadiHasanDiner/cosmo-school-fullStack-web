import { FaUserFriends, FaChalkboardTeacher } from "react-icons/fa";

import { MdFamilyRestroom } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import { useNavigate } from "react-router";
import useAxios from "../../hooks/useAxios";

const accountTypes = [
  {
    id: "guardian",
    title: "Guardian",
    description:
      "I am a parent or guardian of one or more students of Cosmo School.",
    icon: FaUserFriends,
  },
  {
    id: "teacher",
    title: "Teacher",
    description: "I am currently working as a teacher at Cosmo School.",
    icon: FaChalkboardTeacher,
  },
  {
    id: "guardian_teacher",
    title: "Guardian & Teacher",
    description:
      "I am a teacher of Cosmo School and also a guardian of a student.",
    icon: MdFamilyRestroom,
  },
];

const AccountTypeSetup = ({ dbUser, refetchDbUser }) => {
  const axiosInstance = useAxios();
  const [selectedType, setSelectedType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!selectedType) {
      setError("Please select how you are connected with Cosmo School.");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      const response = await axiosInstance.patch(
        `/users/${dbUser._id}/account-type`,
        {
          accountType: selectedType,
        },
      );

      if (response.data.success) {
        // If you use TanStack Query,
        // refetch the logged-in user's DB information
        if (refetchDbUser) {
          await refetchDbUser();
        }

        if (selectedType === "guardian") {
          navigate("/dashboard/complete-guardian-profile");
        }

        if (selectedType === "teacher") {
          navigate("/dashboard/complete-teacher-profile");
        }

        if (selectedType === "guardian_teacher") {
          navigate("/dashboard/complete-guardian-profile");
        }
      }
    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[calc(100vh-80px)] bg-base-200/50 px-4 py-10 sm:px-6 lg:px-8 body-font">
      <div className="mx-auto max-w-5xl">
        {/* User welcome */}
        <div className="text-center">
          {dbUser?.photoURL && (
            <img
              src={dbUser.photoURL}
              alt={dbUser.name}
              className="
                mx-auto size-20 rounded-full
                border-4 border-white object-cover
                shadow-[0_12px_35px_rgba(0,0,0,0.15)]
              "
            />
          )}

          <p className="mt-5 text-sm font-bold uppercase tracking-[0.15em] text-primary">
            Welcome to Cosmo School
          </p>

          <h1 className="mt-2 text-3xl font-black text-neutral sm:text-4xl">
            Hi, {dbUser?.name}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-red-600/70">
            Your account setup is incomplete. Tell us how you are connected with
            Cosmo School to continue.
          </p>
        </div>

        {/* Progress */}
        <div className="mx-auto mt-8 max-w-xl">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-primary">Account Type</span>

            <span className="text-base-content/40">Profile Details</span>

            <span className="text-base-content/40">Verification</span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-base-300">
            <div className="h-full w-1/3 rounded-full bg-linear-to-r from-primary via-secondary to-accent" />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {accountTypes.map((item) => {
            const Icon = item.icon;
            const isSelected = selectedType === item.id;

            return (
              <button
                type="button"
                key={item.id}
                onClick={() => {
                  setSelectedType(item.id);
                  setError("");
                }}
                className={`
                  group relative min-h-65
                  overflow-hidden rounded-3xl border-2
                  p-7 text-left
                  transition-all duration-500

                  ${
                    isSelected
                      ? `
                        -translate-y-2
                        border-primary
                        bg-primary/6
                        shadow-[0_24px_55px_rgba(39,140,69,0.20)]
                      `
                      : `
                        border-base-300
                        bg-base-100
                        shadow-[0_10px_30px_rgba(0,0,0,0.07)]
                        hover:-translate-y-2
                        hover:border-primary/40
                        hover:shadow-[0_22px_50px_rgba(39,140,69,0.14)]
                      `
                  }
                `}
              >
                {/* Decorative glow */}
                <span
                  className={`
                    absolute -right-16 -top-16
                    size-40 rounded-full blur-3xl
                    transition-all duration-700

                    ${
                      isSelected
                        ? "scale-125 bg-primary/20"
                        : "bg-primary/5 group-hover:scale-125 group-hover:bg-primary/15"
                    }
                  `}
                />

                {/* Check */}
                <span
                  className={`
                    absolute right-5 top-5
                    grid size-7 place-items-center
                    rounded-full border-2
                    transition-all duration-300

                    ${
                      isSelected
                        ? "border-primary bg-primary text-white"
                        : "border-base-300 bg-white"
                    }
                  `}
                >
                  {isSelected && "✓"}
                </span>

                {/* Icon */}
                <div
                  className={`
                    grid size-16 place-items-center
                    rounded-2xl text-3xl
                    transition-all duration-500

                    ${
                      isSelected
                        ? "-rotate-3 scale-110 bg-primary text-white shadow-lg"
                        : "bg-primary/10 text-primary group-hover:-rotate-3 group-hover:scale-110 group-hover:bg-primary group-hover:text-white"
                    }
                  `}
                >
                  <Icon />
                </div>

                <h2 className="mt-6 text-2xl font-black text-neutral">
                  {item.title}
                </h2>

                <p className="mt-3 leading-7 text-base-content/65">
                  {item.description}
                </p>

                <span
                  className={`
                    absolute inset-x-0 bottom-0 h-1
                    origin-left
                    bg-linear-to-r
                    from-primary via-secondary to-accent
                    transition-transform duration-500

                    ${
                      isSelected
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }
                  `}
                />
              </button>
            );
          })}
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-error mt-6 rounded-2xl">
            <span>{error}</span>
          </div>
        )}

        {/* Continue */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            disabled={!selectedType || isSubmitting}
            onClick={handleContinue}
            className="
              btn min-h-14 min-w-57
              rounded-2xl border-none
              bg-primary px-8
              text-base font-black text-white
              shadow-[0_12px_30px_rgba(39,140,69,0.24)]
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-[#20783a]
              hover:shadow-[0_18px_38px_rgba(39,140,69,0.30)]
              disabled:translate-y-0
              disabled:opacity-40
            "
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm" />
                Saving...
              </>
            ) : (
              <>
                Continue
                <FiArrowRight className="text-lg" />
              </>
            )}
          </button>
        </div>

        <p className="mt-5 text-center text-sm text-base-content/45">
          You can contact the school administration if you need help choosing
          the correct account type.
        </p>
      </div>
    </section>
  );
};

export default AccountTypeSetup;
