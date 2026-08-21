import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";

const IncompleteProfile = ({ user }) => {
  // =====================================================
  // এই function user বর্তমানে কোন ধাপে আছে
  // সেই অনুযায়ী তাকে কোথায় পাঠাবে
  // =====================================================
  const getContinuePath = () => {
    if (user?.onboardingStep === "guardian-profile") {
      return "/dashboard/complete-guardian-profile";
    }

    if (user?.onboardingStep === "guardian-student-link") {
      return "/dashboard/link-student";
    }

    if (user?.onboardingStep === "guardian-verification") {
      return "/dashboard/verification-pending";
    }

    return "/dashboard";
  };

  // =====================================================
  // Button-এর ভিতরে কোন লেখা দেখাবে
  // =====================================================

  const getButtonText = () => {
    if (user?.onboardingStep === "guardian-profile") {
      return "Complete Guardian Profile";
    }

    if (user?.onboardingStep === "guardian-student-link") {
      return "Continue Student Linking";
    }

    if (user?.onboardingStep === "guardian-verification") {
      return "View Verification Status";
    }

    return "Continue Setup";
  };

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-3xl border border-primary/15 bg-base-100 p-8 text-center shadow-[0_25px_60px_rgba(39,140,69,0.12)] sm:p-10">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-secondary/20 text-4xl">
          👋
        </div>

        <p className="mt-6 font-bold text-primary">Welcome to Cosmo School</p>

        <h1 className="mt-2 text-3xl font-black text-neutral">
          Complete Your Setup
        </h1>

        <p className="mt-4 leading-7 text-base-content/60">
          Your account setup is not finished yet. Please continue from where you
          left off.
        </p>

        <Link
          to={getContinuePath()}
          className="btn mt-7 min-h-13 rounded-xl border-none bg-primary px-7 font-bold text-white hover:bg-primary/90"
        >
          {getButtonText()}
          <FiArrowRight />
        </Link>
      </div>
    </section>
  );
};

export default IncompleteProfile;
