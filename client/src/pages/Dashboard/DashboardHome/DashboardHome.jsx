import LoadingSpinner from "../../../components/common/LoadingSpinner";
import useDbUser from "../../../hooks/useDbUser";
import AccountTypeSetup from "./AccountTypeSetup";
import GuardianDashboardHome from "./GuardianDashboardHome";
import IncompleteProfile from "./IncompleteProfile";
import VerificationPending from "./VerificationPending";

const DashboardHome = () => {
  const { dbUser, isDbUserLoading, refetchDbUser } = useDbUser();

  if (isDbUserLoading) {
    return <LoadingSpinner />;
  }
  // Step 1
  // এখনও account type select করেনি
  if (!dbUser?.accountType) {
    return <AccountTypeSetup dbUser={dbUser} refetchDbUser={refetchDbUser} />;
  }

  // Step 2
  // =====================================================
  // Guardian Profile এখনো শেষ হয়নি
  // =====================================================
  if (dbUser?.onboardingStep === "guardian-profile") {
    return <IncompleteProfile user={dbUser} />;
  }

  // Step 3
  // =====================================================
  // Guardian Profile শেষ হয়েছে,
  // কিন্তু Student Link এখনো হয়নি
  // =====================================================
  if (dbUser?.onboardingStep === "guardian-student-link") {
    return <IncompleteProfile user={dbUser} />;
  }

  // step 4
  // =====================================================
  // Student link হয়েছে এবং Admin review করছে
  // =====================================================
  if (dbUser?.onboardingStep === "guardian-verification") {
    return <VerificationPending />;
  }

  // step 5
  // =====================================================
  // সবকিছু শেষ
  // =====================================================
  if (dbUser?.onboardingStep === "completed") {
    return <GuardianDashboardHome />;
  }

  return <IncompleteProfile user={dbUser} />;
};

export default DashboardHome;
