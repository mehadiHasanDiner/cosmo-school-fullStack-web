import LoadingSpinner from "../../../components/common/LoadingSpinner";
import useDbUser from "../../../hooks/useDbUser";
import AccountTypeSetup from "../DashboardSetup/AccountTypeSetup";
import GuardianDashboardHome from "./GuardianDashboardHome";
import TeacherDashboardHome from "./TeacherDashboardHome";
import GuardianTeacherDashboardHome from "./GuardianTeacherDashboardHome";
import IncompleteProfile from "../DashboardSetup/IncompleteProfile";
import VerificationPending from "../DashboardSetup/VerificationPending";
import AdminDashboard from "./AdminDashboard";

const DashboardHome = () => {
  const { dbUser, isDbUserLoading, refetchDbUser } = useDbUser();

  // =====================================================
  // MongoDB থেকে user data load হওয়ার সময়
  // =====================================================
  if (isDbUserLoading) {
    return <LoadingSpinner />;
  }

  // =====================================================
  // Safety check:
  // কোনো কারণে dbUser না পাওয়া গেলে
  // component-এর নিচের logic যেন error না দেয়।
  // =====================================================
  if (!dbUser) {
    return <div className="p-6 text-center">User information not found.</div>;
  }

  // =====================================================
  // ADMIN
  //
  // এটা normal user onboarding-এর আগে check করবো।
  // Admin-এর Guardian/Teacher onboarding প্রয়োজন নেই।
  // =====================================================
  if (dbUser.role === "admin") {
    return <AdminDashboard user={dbUser} />;
  }

  // =====================================================
  // STEP 1:
  // User এখনো Guardian / Teacher / Both
  // কোন account type select করেনি।
  // =====================================================
  if (!dbUser.accountType) {
    return <AccountTypeSetup dbUser={dbUser} refetchDbUser={refetchDbUser} />;
  }

  // =====================================================
  // SETUP STEPS
  //
  // এই stepগুলোতে user-এর account setup এখনও incomplete।
  // কোন form/page-এ যেতে হবে সেটা IncompleteProfile
  // onboardingStep দেখে ঠিক করবে।
  // =====================================================
  const incompleteSteps = [
    "guardian-profile",
    "guardian-student-link",
    "teacher-profile",
  ];

  if (incompleteSteps.includes(dbUser.onboardingStep)) {
    return <IncompleteProfile user={dbUser} />;
  }

  // =====================================================
  // VERIFICATION STEPS
  //
  // Guardian, Teacher এবং Guardian+Teacher—
  // তিন ধরনের Admin verification এখানে handle হবে।
  // =====================================================
  const verificationSteps = [
    "guardian-verification",
    "teacher-verification",
    "guardian-teacher-verification",
  ];

  if (verificationSteps.includes(dbUser.onboardingStep)) {
    return <VerificationPending user={dbUser} />;
  }

  // =====================================================
  // সব onboarding এবং verification complete।
  // এখন accountType অনুযায়ী dashboard দেখাবো।
  // =====================================================
  if (dbUser.onboardingStep === "completed") {
    if (dbUser.accountType === "guardian") {
      return <GuardianDashboardHome user={dbUser} />;
    }

    if (dbUser.accountType === "teacher") {
      return <TeacherDashboardHome user={dbUser} />;
    }

    if (dbUser.accountType === "guardian_teacher") {
      return <GuardianTeacherDashboardHome user={dbUser} />;
    }
    if (dbUser.accountType === "admin") {
      return <GuardianTeacherDashboardHome user={dbUser} />;
    }
  }

  // =====================================================
  // Fallback:
  // database-এ unexpected onboardingStep থাকলে
  // setup screen দেখাবে।
  // =====================================================
  return <IncompleteProfile user={dbUser} />;
};

export default DashboardHome;
