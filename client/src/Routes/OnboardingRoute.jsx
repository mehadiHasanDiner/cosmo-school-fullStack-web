import { Navigate } from "react-router";
import LoadingSpinner from "../components/common/LoadingSpinner";
import useDbUser from "../hooks/useDbUser";

const OnboardingRoute = ({
  children,
  allowedSteps = [],
  allowedAccountTypes = [],
}) => {
  const { dbUser, isDbUserLoading } = useDbUser();

  // Database user loading
  if (isDbUserLoading) {
    return <LoadingSpinner />;
  }

  // User পাওয়া না গেলে
  if (!dbUser) {
    return <Navigate to="/login" replace />;
  }

  // Onboarding Step Check
  if (
    allowedSteps.length > 0 &&
    !allowedSteps.includes(dbUser.onboardingStep)
  ) {
    return <Navigate to="/dashboard" replace />;
  }
  //সব condition ঠিক
  return children;
};

export default OnboardingRoute;
