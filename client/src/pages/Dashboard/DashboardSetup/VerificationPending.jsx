import {
  FiClock,
  FiCheckCircle,
  FiShield,
  FiUser,
  FiMail,
  FiRefreshCw,
} from "react-icons/fi";

const VerificationPending = ({ user }) => {
  // =====================================================
  // accountType অনুযায়ী সুন্দর readable text তৈরি করছি
  // =====================================================
  const getAccountTypeName = () => {
    if (user?.accountType === "guardian") {
      return "Guardian";
    }

    if (user?.accountType === "teacher") {
      return "Teacher";
    }

    if (user?.accountType === "guardian_teacher") {
      return "Guardian & Teacher";
    }

    return "User";
  };

  const verificationSteps = [
    {
      title: "Profile Submitted",
      description: "Your profile information has been submitted successfully.",
      completed: true,
    },
    {
      title: "School Review",
      description: "Cosmo School administration is reviewing your information.",
      completed: false,
      current: true,
    },
    {
      title: "Account Approval",
      description:
        "After approval, your full dashboard access will be activated.",
      completed: false,
    },
  ];

  return (
    <section className="min-h-[80vh] bg-base-200/40 px-4 py-10 sm:px-6 lg:px-8 body-font">
      <div className="mx-auto max-w-5xl">
        {/* ================= Header Card ================= */}

        <div
          className="
            relative overflow-hidden rounded-3xl
            border border-primary/15
            bg-base-300 p-7
            shadow-lg
            sm:p-10
          "
        >
          <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-10 size-64 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative text-center">
            <div
              className="
                mx-auto grid size-24 place-items-center
                rounded-full border-4 border-warning/20
                bg-warning/10
                shadow-[0_12px_35px_rgba(233,167,25,0.15)]
              "
            >
              <FiClock className="text-4xl text-warning" />
            </div>

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Cosmo School Verification
            </p>

            <h1 className="mt-2 text-3xl font-black text-neutral sm:text-4xl heading-font">
              Verification Pending
            </h1>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-base-content/60">
              Your profile has been submitted successfully. Our school
              administration will review your information before activating your
              full dashboard access.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <span className="badge badge-lg border-primary/20 bg-primary/20 font-bold text-primary">
                {getAccountTypeName()}
              </span>

              <span className="badge badge-lg border-warning/30 bg-warning/80 font-bold text-warning-content">
                Pending Review
              </span>
            </div>
          </div>
        </div>

        {/* ================= User Info ================= */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div
            className="
              rounded-3xl border border-base-300
              bg-base-200 p-6
              shadow-xl
            "
          >
            <h2 className="text-lg font-black text-neutral">
              Account Information
            </h2>

            <div className="mt-5 flex items-center gap-4">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user?.name}
                  className="size-16 rounded-2xl object-cover shadow-md"
                />
              ) : (
                <div className="grid size-16 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <FiUser className="text-2xl" />
                </div>
              )}

              <div>
                <h3 className="font-black text-neutral">
                  {user?.name || "Cosmo User"}
                </h3>

                <p className="mt-1 flex items-center gap-2 text-sm text-base-content/55">
                  <FiMail />
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-primary/15 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-base-content/45">
                Verification Status
              </p>

              <p className="mt-1 font-black capitalize text-warning">
                {user?.verificationStatus || "pending"}
              </p>
            </div>
          </div>

          {/* ================= Verification Progress ================= */}

          <div
            className="
              rounded-3xl border border-base-300
              bg-base-200 p-6
              shadow-xl
              sm:p-7
            "
          >
            <h2 className="text-lg font-black text-neutral">
              Verification Progress
            </h2>

            <div className="mt-6 space-y-2">
              {verificationSteps.map((step, index) => (
                <div key={step.title} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        grid size-11 place-items-center
                        rounded-xl border-2
                        ${
                          step.completed
                            ? "border-success bg-success text-white"
                            : step.current
                              ? "border-warning bg-warning/15 text-warning"
                              : "border-base-300 bg-base-200 text-base-content/35"
                        }
                      `}
                    >
                      {step.completed ? (
                        <FiCheckCircle />
                      ) : step.current ? (
                        <FiRefreshCw className="animate-spin" />
                      ) : (
                        <FiShield />
                      )}
                    </div>

                    {index !== verificationSteps.length - 1 && (
                      <div
                        className={`
                          my-1 min-h-10 w-0.5 flex-1
                          ${step.completed ? "bg-success" : "bg-base-300"}
                        `}
                      />
                    )}
                  </div>

                  <div className="mb-5 flex-1">
                    <h3
                      className={`
                        font-black
                        ${step.current ? "text-warning" : "text-neutral"}
                      `}
                    >
                      {step.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-base-content/55">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-info/15 bg-info/5 p-5 text-center text-sm leading-6 text-base-content/65">
          No further action is required at this moment. After approval, your
          dashboard will automatically unlock the features available for your
          account.
        </div>
      </div>
    </section>
  );
};

export default VerificationPending;

// import {
//   FiClock,
//   FiCheckCircle,
//   FiShield,
//   FiUser,
//   FiRefreshCw,
// } from "react-icons/fi";

// const VerificationPending = ({ user }) => {
//   const getAccountTypeText = () => {
//     if (user?.accountType === "guardian") {
//       return "Guardian";
//     }

//     if (user?.accountType === "teacher") {
//       return "Teacher";
//     }

//     if (user?.accountType === "guardian_teacher") {
//       return "Guardian & Teacher";
//     }

//     return "User";
//   };

//   return (
//     <section className="min-h-[80vh] bg-base-200/40 px-4 py-10 sm:px-6 lg:px-8">
//       <div className="mx-auto max-w-5xl">
//         {/* Main card */}
//         <div className="overflow-hidden rounded-3xl border border-primary/15 bg-base-100 shadow-[0_25px_70px_rgba(39,140,69,0.12)]">
//           {/* Top gradient line */}
//           <div className="h-1.5 bg-gradient-to-r from-primary via-secondary to-accent" />

//           <div className="p-6 sm:p-10">
//             <div className="flex flex-col items-center text-center">
//               <div className="relative">
//                 <div className="grid size-24 place-items-center rounded-full bg-warning/15 text-warning shadow-[0_10px_30px_rgba(234,167,25,0.20)]">
//                   <FiClock className="text-4xl" />
//                 </div>

//                 <span className="absolute -right-1 -top-1 size-5 animate-pulse rounded-full bg-secondary shadow-[0_0_0_6px_rgba(244,197,24,0.15)]" />
//               </div>

//               <p className="mt-7 text-sm font-black uppercase tracking-[0.18em] text-primary">
//                 Verification Pending
//               </p>

//               <h1 className="mt-2 text-3xl font-black text-neutral sm:text-4xl">
//                 Your Profile Is Under Review
//               </h1>

//               <p className="mt-4 max-w-2xl leading-7 text-base-content/60">
//                 Your {getAccountTypeText()} profile has been submitted
//                 successfully. Cosmo School administration will review your
//                 information before enabling your full dashboard access.
//               </p>
//             </div>

//             {/* Status details */}
//             <div className="mt-10 grid gap-4 sm:grid-cols-3">
//               <StatusCard
//                 icon={FiUser}
//                 title="Profile Submitted"
//                 text="Your account information has been received."
//                 status="done"
//               />

//               <StatusCard
//                 icon={FiShield}
//                 title="Admin Review"
//                 text="School administration is verifying your information."
//                 status="current"
//               />

//               <StatusCard
//                 icon={FiCheckCircle}
//                 title="Dashboard Access"
//                 text="Full access will be enabled after approval."
//                 status="upcoming"
//               />
//             </div>

//             {/* Info box */}
//             <div className="mt-8 rounded-2xl border border-info/20 bg-info/5 p-5">
//               <div className="flex gap-4">
//                 <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-info/10 text-info">
//                   <FiRefreshCw className="text-xl" />
//                 </div>

//                 <div>
//                   <h3 className="font-black text-neutral">
//                     No action is required right now
//                   </h3>

//                   <p className="mt-1 text-sm leading-6 text-base-content/60">
//                     You can safely leave this page and return later. Your
//                     verification status will remain saved in your account.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-8 text-center text-sm text-base-content/45">
//               Account Type:{" "}
//               <span className="font-bold text-primary">
//                 {getAccountTypeText()}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// const StatusCard = ({ icon: Icon, title, text, status }) => {
//   const style =
//     status === "done"
//       ? "border-success/20 bg-success/5 text-success"
//       : status === "current"
//         ? "border-warning/30 bg-warning/10 text-warning"
//         : "border-base-300 bg-base-200/50 text-base-content/40";

//   return (
//     <div className={`rounded-2xl border p-5 ${style}`}>
//       <div className="grid size-11 place-items-center rounded-xl bg-current/10">
//         <Icon className="text-xl" />
//       </div>

//       <h3 className="mt-4 font-black text-neutral">{title}</h3>

//       <p className="mt-2 text-sm leading-6 text-base-content/55">{text}</p>
//     </div>
//   );
// };

// export default VerificationPending;
