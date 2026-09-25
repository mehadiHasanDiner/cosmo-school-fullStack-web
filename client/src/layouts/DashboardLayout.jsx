import useDbUser from "../hooks/useDbUser";
import LoadingSpinner from "../components/common/LoadingSpinner";
import DashboardLayoutContent from "./DashboardLayoutContent";

const DashboardLayout = () => {
  const { dbUser, isDbUserLoading } = useDbUser();

  if (isDbUserLoading) {
    return <LoadingSpinner />;
  }

  if (!dbUser) {
    return <div>User not found</div>;
  }

  return <DashboardLayoutContent dbUser={dbUser} />;
};

export default DashboardLayout;
