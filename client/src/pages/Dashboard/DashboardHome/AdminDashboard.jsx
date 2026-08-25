import { useQuery } from "@tanstack/react-query";

import LoadingSpinner from "../../../components/common/LoadingSpinner";
import AdminDashboardHome from "./AdminDashboardHome";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboard = ({ user }) => {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-dashboard-stats"],

    queryFn: async () => {
      const res = await axiosSecure.get("/admin/dashboard/stats");

      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="p-10 text-center">
        <h2 className="font-bold text-error">Failed to load dashboard.</h2>
      </div>
    );
  }

  return <AdminDashboardHome user={user} stats={data?.stats} />;
};

export default AdminDashboard;
