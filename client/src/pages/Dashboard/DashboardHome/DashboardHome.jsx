import LoadingSpinner from "../../../components/common/LoadingSpinner";
import useDbUser from "../../../hooks/useDbUser";
import AccountTypeSetup from "./AccountTypeSetup";
import IncompleteProfile from "./IncompleteProfile";

const DashboardHome = () => {
  const { dbUser, isDbUserLoading, refetchDbUser } = useDbUser();

  if (isDbUserLoading) {
    return <LoadingSpinner />;
  }
  // এখনও account type select করেনি
  if (!dbUser?.accountType) {
    return <AccountTypeSetup dbUser={dbUser} refetchDbUser={refetchDbUser} />;
  }

  // Account type selected,
  // but profile isn't complete ডাটাবেজে profileCompleted ফিল্ডটি আছে কি’না
  if (!dbUser?.profileCompleted) {
    return <IncompleteProfile user={dbUser} />;
  }

  return (
    <div>
      <p>Dashboard Home</p>
    </div>
  );
};

export default DashboardHome;
