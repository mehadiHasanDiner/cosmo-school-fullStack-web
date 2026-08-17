import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";

const IncompleteProfile = ({ user }) => {
  const getContinuePath = () => {
    if (user.accountType === "guardian") {
      return "/dashboard/complete-guardian-profile";
    }

    if (user.accountType === "teacher") {
      return "/dashboard/complete-teacher-profile";
    }

    if (user.accountType === "guardian_teacher") {
      return "/dashboard/complete-guardian-profile";
    }

    return "/dashboard";
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4">
      <div
        className="
          w-full max-w-xl rounded-3xl
          border border-primary/15
          bg-base-100 p-8 text-center
          shadow-[0_25px_60px_rgba(39,140,69,0.12)]
          sm:p-10
        "
      >
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-secondary/20 text-4xl">
          👋
        </div>

        <p className="mt-6 font-bold text-primary">Welcome to Cosmo School</p>

        <h1 className="mt-2 text-3xl font-black text-neutral">
          Complete Your Profile
        </h1>

        <p className="mt-4 leading-7 text-base-content/60">
          You have selected{" "}
          <strong className="capitalize text-neutral">
            {user.accountType?.replace("_", " & ")}
          </strong>
          . Complete your profile to access your dashboard.
        </p>

        <Link
          to={getContinuePath()}
          className="
            btn mt-7 min-h-13
            rounded-xl border-none
            bg-primary px-7 font-bold text-white
            hover:bg-[#20783a]
          "
        >
          Continue Setup
          <FiArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default IncompleteProfile;
