import useDbUser from "../../../hooks/usedbUser";

const GuardianProfileSetup = () => {
  const { dbUser } = useDbUser();
  return (
    <div>
      <p>Guardian Profile Setup: {dbUser?.name}</p>
      <p>Guardian Profile Setup: {dbUser?._id}</p>
    </div>
  );
};

export default GuardianProfileSetup;
