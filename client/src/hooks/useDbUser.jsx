import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useDbUser = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: dbUser,
    isLoading: isDbUserLoading,
    refetch: refetchDbUser,
  } = useQuery({
    queryKey: ["dbUser", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data || null;
    },
  });
  return { dbUser, isDbUserLoading, refetchDbUser };
};

export default useDbUser;
