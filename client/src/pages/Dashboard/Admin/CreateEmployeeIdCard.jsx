import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import EmployeeIdCard from "../../../components/dashboard/EmployeeIdCard";

const CreateEmployeeIdCard = () => {
  const axiosSecure = useAxiosSecure();

  // Default: Teacher list
  const [selectedRole, setSelectedRole] = useState("teacher");

  const {
    data: employees = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["employees-by-role", selectedRole],

    queryFn: async () => {
      const res = await axiosSecure.get(
        `/admin/employees/by-role?role=${selectedRole}`,
      );

      console.log("Employees:", res.data);

      return res.data ?? [];
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="py-10 text-center text-red-500">
        Failed to load employees.
      </p>
    );
  }

  return (
    <section className="p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-[#20252B]">
          Employee ID Cards
        </h2>

        <p className="mt-2 text-gray-500">
          View and manage Cosmo School employee ID cards.
        </p>
      </div>

      {/* Role Filter */}
      <div className="mb-8 flex flex-wrap gap-3">
        {["teacher", "admin"].map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => setSelectedRole(role)}
            className={`btn rounded-xl capitalize ${
              selectedRole === role ? "btn-primary text-white" : "btn-outline"
            }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* Employee Count */}
      <p className="mb-5 font-semibold text-gray-600">
        Total {selectedRole}s: {employees.length}
      </p>

      {/* Employee Cards */}
      {employees.length === 0 ? (
        <div className="rounded-xl bg-base-200 p-10 text-center">
          No employees found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {employees.map((employee) => (
            <EmployeeIdCard key={employee._id} employee={employee} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CreateEmployeeIdCard;
