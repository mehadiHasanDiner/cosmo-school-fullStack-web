import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users/all");
      return res.data;
    },
  });
  return (
    <section className="p-4 sm:p-6 lg:p-8 body-font">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            All Users
          </p>

          <h1 className="mt-1 text-3xl font-black text-neutral">
            All Users List
          </h1>

          <p className="mt-2 text-base-content/60">
            View and manage all users in the system, including guardians,
            teachers, administrators, and other roles. You can verify, edit, or
            remove users as needed.
          </p>
          <p>{users.length} users found</p>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.verificationStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AllUsers;
