import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { FiEye, FiUser, FiMail, FiClock } from "react-icons/fi";

import LoadingSpinner from "../../../components/common/LoadingSpinner";
import UserVerificationModal from "../../../components/dashboard/UserVerificationModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminVerification = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pending-users"],

    queryFn: async () => {
      const res = await axiosSecure.get("/admin/users");

      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-error">
        Failed to load pending users.
      </div>
    );
  }

  return (
    <section className="p-4 sm:p-6 lg:p-8 body-font">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-primary">
            Verification
          </p>

          <h1 className="mt-1 text-3xl font-black text-neutral">
            Pending Users
          </h1>

          <p className="mt-2 text-base-content/60">
            Review Guardian and Teacher verification requests.
          </p>
        </div>

        {/* Users */}

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          {users.map((user) => (
            <div
              key={user._id}
              className="
                rounded-2xl border border-base-300
                bg-base-100 p-5
                shadow-[0_10px_30px_rgba(0,0,0,0.05)]
                transition-all duration-300
                hover:-translate-y-1
                hover:border-primary/20
                hover:shadow-[0_16px_40px_rgba(39,140,69,0.10)]
              "
            >
              <div className="flex items-start gap-4">
                {/* Photo */}

                <div className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-primary/10 text-primary">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FiUser className="text-xl" />
                  )}
                </div>

                {/* Info */}

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-black text-neutral">
                        {user.name}
                      </h2>

                      <p className="mt-1 flex items-center gap-2 text-sm text-base-content/55">
                        <FiMail />
                        {user.email}
                      </p>
                    </div>

                    <span className="badge border-warning/80 bg-warning/60 font-bold text-warning-content">
                      <FiClock />
                      Pending
                    </span>
                  </div>

                  <p className="mt-4 text-sm capitalize text-base-content/60">
                    Account Type:{" "}
                    <strong className="text-neutral">
                      {user.accountType?.replace("_", " & ")}
                    </strong>
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelectedUserId(user._id)}
                    className="
                      btn btn-sm mt-5 rounded-xl
                      border-primary/20
                      bg-primary/10 text-primary
                      hover:bg-primary hover:text-white
                    "
                  >
                    <FiEye />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty */}

        {users.length === 0 && (
          <div className="mt-8 rounded-2xl border border-dashed border-primary/25 p-10 text-center">
            No pending verification requests.
          </div>
        )}
      </div>

      {/* =====================================================
          Modal

          selectedUserId থাকলে modal render হবে
      ====================================================== */}

      {selectedUserId && (
        <UserVerificationModal
          userId={selectedUserId}
          onClose={() => {
            setSelectedUserId(null);
          }}
          onSuccess={async () => {
            // Accept/Reject হওয়ার পরে pending users আবার load হবে
            await refetch();

            setSelectedUserId(null);
          }}
        />
      )}
    </section>
  );
};

export default AdminVerification;
