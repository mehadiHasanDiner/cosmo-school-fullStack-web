import LoadingSpinner from "../../../components/common/LoadingSpinner";
import useDbUser from "../../../hooks/useDbUser";
import AccountTypeSetup from "../AccountTypeSetup";

const DashboardHome = () => {
  const { dbUser, isDbUserLoading, refetchDbUser } = useDbUser();

  if (isDbUserLoading) {
    return <LoadingSpinner />;
  }
  // এখনও account type select করেনি
  if (!dbUser?.accountType) {
    return <AccountTypeSetup dbUser={dbUser} refetchDbUser={refetchDbUser} />;
  }
  return (
    <div>
      <p>Dashboard Home</p>
    </div>
  );
};

export default DashboardHome;
