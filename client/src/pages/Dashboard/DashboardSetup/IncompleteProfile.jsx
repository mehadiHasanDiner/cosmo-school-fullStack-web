import { Link } from "react-router";
import {
  FiArrowRight,
  FiCheck,
  FiClock,
  FiUser,
  FiUsers,
  FiBookOpen,
  FiShield,
} from "react-icons/fi";

const IncompleteProfile = ({ user }) => {
  // =====================================================
  // accountType অনুযায়ী onboarding-এর সব step তৈরি করছি।
  //
  // Guardian, Teacher এবং Guardian+Teacher-এর
  // step সংখ্যা আলাদা হবে।
  // =====================================================
  const getSteps = () => {
    if (user?.accountType === "guardian") {
      return [
        {
          id: "account-type",
          title: "Account Type",
          description: "Guardian account selected",
          icon: FiUser,
        },
        {
          id: "guardian-profile",
          title: "Guardian Profile",
          description: "Complete your personal information",
          icon: FiUsers,
        },
        {
          id: "guardian-student-link",
          title: "Link Your Child",
          description: "Link student using school Student ID",
          icon: FiBookOpen,
        },
        {
          id: "guardian-verification",
          title: "Admin Verification",
          description: "School administration will review your profile",
          icon: FiShield,
        },
      ];
    }

    if (user?.accountType === "teacher_admin") {
      return [
        {
          id: "account-type",
          title: "Account Type",
          description: "Employee account selected",
          icon: FiUser,
        },
        {
          id: "employee-profile",
          title: "Employee Profile",
          description: "Complete your employee information",
          icon: FiUsers,
        },
        {
          id: "employee-verification",
          title: "Admin Verification",
          description: "School administration will review your profile",
          icon: FiShield,
        },
      ];
    }

    if (user?.accountType === "guardian_teacher") {
      return [
        {
          id: "account-type",
          title: "Account Type",
          description: "Guardian & Employee account selected",
          icon: FiUser,
        },
        {
          id: "guardian-profile",
          title: "Guardian Profile",
          description: "Complete your guardian information",
          icon: FiUsers,
        },
        {
          id: "guardian-student-link",
          title: "Link Your Child",
          description: "Link your child using Student ID",
          icon: FiBookOpen,
        },
        {
          id: "employee-profile",
          title: "Employee Profile",
          description: "Complete your employee information",
          icon: FiUsers,
        },
        {
          id: "guardian-employee-verification",
          title: "Admin Verification",
          description: "School administration will review both profiles",
          icon: FiShield,
        },
      ];
    }

    if (user?.accountType === "guardian_admin") {
      return [
        {
          id: "account-type",
          title: "Account Type",
          description: "Guardian & Employee account selected",
          icon: FiUser,
        },
        {
          id: "guardian-profile",
          title: "Guardian Profile",
          description: "Complete your guardian information",
          icon: FiUsers,
        },
        {
          id: "guardian-student-link",
          title: "Link Your Child",
          description: "Link your child using Student ID",
          icon: FiBookOpen,
        },
        {
          id: "employee-profile",
          title: "Employee Profile",
          description: "Complete your employee information",
          icon: FiUsers,
        },
        {
          id: "guardian-employee-verification",
          title: "Admin Verification",
          description: "School administration will review both profiles",
          icon: FiShield,
        },
      ];
    }

    return [];
  };

  const steps = getSteps();

  // =====================================================
  // User বর্তমানে কোন step-এ আছে,
  // সেই step-এর index বের করছি।
  //
  // Example:
  // guardian-student-link হলে index = 2 হতে পারে।
  // =====================================================
  const getCurrentStepIndex = () => {
    const index = steps.findIndex((step) => step.id === user?.onboardingStep);

    /*
      যদি onboardingStep match না করে,
      তাহলে প্রথম step দেখাবো।
    */
    return index === -1 ? 0 : index;
  };

  const currentStepIndex = getCurrentStepIndex();

  // =====================================================
  // User-কে কোন page-এ পাঠাতে হবে।
  // =====================================================
  const getContinuePath = () => {
    if (user?.onboardingStep === "guardian-profile") {
      return "/dashboard/complete-guardian-profile";
    }

    if (user?.onboardingStep === "guardian-student-link") {
      return "/dashboard/link-student";
    }

    if (user?.onboardingStep === "employee-profile") {
      return "/dashboard/complete-employee-profile";
    }

    if (
      user?.onboardingStep === "guardian-verification" ||
      user?.onboardingStep === "employee-verification" ||
      user?.onboardingStep === "guardian-employee-verification"
    ) {
      return "/dashboard/verification-pending";
    }

    return "/dashboard";
  };

  // =====================================================
  // Current step অনুযায়ী button text।
  // =====================================================
  const getButtonText = () => {
    if (user?.onboardingStep === "guardian-profile") {
      return "Complete Guardian Profile";
    }

    if (user?.onboardingStep === "guardian-student-link") {
      return "Continue Student Linking";
    }

    if (user?.onboardingStep === "employee-profile") {
      return "Complete Employee Profile";
    }

    if (
      user?.onboardingStep === "guardian-verification" ||
      user?.onboardingStep === "employee-verification" ||
      user?.onboardingStep === "guardian-employee-verification"
    ) {
      return "View Verification Status";
    }

    return "Continue Setup";
  };

  // =====================================================
  // Progress percentage বের করছি।
  //
  // Example:
  // 4টা step-এর মধ্যে 2 নম্বর step হলে
  // প্রায় 50% progress দেখাবে।
  // =====================================================
  const progressPercentage =
    steps.length > 0
      ? Math.round(((currentStepIndex + 1) / steps.length) * 100)
      : 0;

  return (
    <section className="min-h-[80vh] bg-base-200/40 px-4 py-8 sm:px-6 lg:px-8 body-font">
      <div className="mx-auto max-w-5xl">
        {/* =========================================
            Welcome Area
        ========================================== */}

        <div className="rounded-3xl border border-primary/10 bg-base-100 p-6 shadow-[0_20px_60px_rgba(39,140,69,0.10)] sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
                Welcome to Cosmo School 👋
              </p>

              <h1 className="mt-2 text-3xl font-black text-neutral sm:text-4xl heading-font">
                Complete Your Account Setup
              </h1>

              <p className="mt-3 max-w-2xl leading-7 text-base-content/60">
                Your profile setup is still in progress. Complete the remaining
                steps to unlock your full dashboard.
              </p>
            </div>

            <div className="shrink-0 rounded-2xl bg-primary/10 px-5 py-4 text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-base-content/50">
                Progress
              </p>

              <p className="mt-1 text-3xl font-black text-primary">
                {progressPercentage}%
              </p>
            </div>
          </div>

          {/* =========================================
              Progress Bar
          ========================================== */}

          <div className="mt-7">
            <div className="h-2.5 overflow-hidden rounded-full bg-base-300">
              <div
                className="
                  h-full rounded-full
                  bg-linear-to-r
                  from-primary via-secondary to-accent
                  transition-all duration-700
                "
                style={{
                  width: `${progressPercentage}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* =========================================
            Account Type Badge
        ========================================== */}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="text-sm font-semibold text-base-content/50">
            Account Type:
          </span>

          <span className="badge badge-lg border-primary/20 bg-primary/10 font-bold capitalize text-primary">
            {user?.accountType?.replace("_", " & ")}
          </span>
        </div>

        {/* =========================================
            Progress Steps
        ========================================== */}

        <div className="mt-6 rounded-3xl border border-base-300 bg-base-100 p-5 shadow-[0_15px_45px_rgba(0,0,0,0.06)] sm:p-8">
          <h2 className="text-xl font-black text-neutral">
            Account Setup Progress
          </h2>

          <p className="mt-2 text-sm text-base-content/55">
            You can leave anytime. Your progress will be saved and you can
            continue from where you stopped.
          </p>

          <div className="mt-8 space-y-1">
            {steps.map((step, index) => {
              const Icon = step.icon;

              /*
                Step status বের করছি।

                index < currentStepIndex
                → আগের step, তাই completed

                index === currentStepIndex
                → এখনকার step, তাই current

                index > currentStepIndex
                → future step
              */
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isUpcoming = index > currentStepIndex;

              return (
                <div key={step.id} className="relative flex gap-4">
                  {/* =================================
                      Left line + icon
                  ================================== */}

                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        relative z-10 grid size-12 shrink-0 place-items-center
                        rounded-2xl border-2
                        transition-all duration-300

                        ${
                          isCompleted
                            ? "border-primary bg-primary text-white shadow-[0_8px_20px_rgba(39,140,69,0.20)]"
                            : ""
                        }

                        ${
                          isCurrent
                            ? "border-secondary bg-secondary/20 text-neutral shadow-[0_8px_20px_rgba(244,197,24,0.20)]"
                            : ""
                        }

                        ${
                          isUpcoming
                            ? "border-base-300 bg-base-200 text-base-content/35"
                            : ""
                        }
                      `}
                    >
                      {isCompleted ? (
                        <FiCheck className="text-xl" />
                      ) : isCurrent ? (
                        <FiClock className="text-xl" />
                      ) : (
                        <Icon className="text-xl" />
                      )}
                    </div>

                    {/* শেষ step-এর পরে line লাগবে না */}
                    {index !== steps.length - 1 && (
                      <div
                        className={`
                          my-1 min-h-10 w-0.5 flex-1
                          ${isCompleted ? "bg-primary" : "bg-base-300"}
                        `}
                      />
                    )}
                  </div>

                  {/* =================================
                      Step Content
                  ================================== */}

                  <div
                    className={`
                      mb-5 flex-1 rounded-2xl border p-4
                      transition-all duration-300

                      ${isCompleted ? "border-primary/15 bg-primary/4" : ""}

                      ${
                        isCurrent
                          ? "border-secondary/40 bg-secondary/8 shadow-[0_10px_30px_rgba(244,197,24,0.08)]"
                          : ""
                      }

                      ${isUpcoming ? "border-transparent bg-transparent" : ""}
                    `}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <h3
                        className={`
                          font-black
                          ${
                            isUpcoming ? "text-base-content/40" : "text-neutral"
                          }
                        `}
                      >
                        {step.title}
                      </h3>

                      {isCompleted && (
                        <span className="badge border-success bg-success text-xs font-bold text-white">
                          Completed
                        </span>
                      )}

                      {isCurrent && (
                        <span className="badge border-warning/30 bg-warning text-xs font-bold text-warning-content">
                          In Progress
                        </span>
                      )}

                      {isUpcoming && (
                        <span className="badge border-base-300 bg-base-300 text-xs font-bold text-base-content/40">
                          Upcoming
                        </span>
                      )}
                    </div>

                    <p
                      className={`
                        mt-2 text-sm leading-6
                        ${
                          isUpcoming
                            ? "text-base-content/35"
                            : "text-base-content/60"
                        }
                      `}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =========================================
              Continue Button
          ========================================== */}

          <div className="mt-4 border-t border-base-300 pt-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-base-content/45">
                  Current Step
                </p>

                <p className="mt-1 font-black text-neutral">
                  {steps[currentStepIndex]?.title}
                </p>
              </div>

              <Link
                to={getContinuePath()}
                className="
                  btn min-h-13 rounded-xl border-none
                  bg-primary px-7 font-bold text-white
                  shadow-[0_10px_25px_rgba(39,140,69,0.20)]
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:bg-primary/90
                  hover:shadow-[0_14px_32px_rgba(39,140,69,0.26)]
                "
              >
                {getButtonText()}

                <FiArrowRight className="text-lg" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncompleteProfile;
