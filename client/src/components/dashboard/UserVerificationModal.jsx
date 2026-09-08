import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  FiCheck,
  FiX,
  FiUser,
  FiMail,
  FiMapPin,
  FiPhone,
  FiBookOpen,
  FiCalendar,
  FiUsers,
  FiHome,
} from "react-icons/fi";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../common/LoadingSpinner";
import InfoRow from "./InfoRow";
import InformationSection from "./InformationSection";
import Swal from "sweetalert2";

const UserVerificationModal = ({ userId, onClose, onSuccess }) => {
  const axiosSecure = useAxiosSecure();
  const [rejectMode, setRejectMode] = useState(false);
  const [reason, setReason] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["verification-user", userId],

    queryFn: async () => {
      const res = await axiosSecure.get(`/admin/users/${userId}/details`);

      return res.data.data;
    },

    enabled: !!userId,
  });

  // =====================================================
  // ACCEPT USER
  // =====================================================

  const handleAccept = async () => {
    try {
      setActionLoading(true);

      const res = await axiosSecure.patch(`/admin/users/${userId}/accept`);

      if (res.data.success) {
        await onSuccess();
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${res.data?.message}`,
          showConfirmButton: false,
          timer: 2500,
          background: "#03373D",
          color: "#fff",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setActionLoading(false);
    }
  };

  // =====================================================
  // REJECT USER
  // =====================================================

  const handleReject = async () => {
    if (!reason.trim()) {
      return;
    }
    console.log(reason);

    try {
      setActionLoading(true);

      const res = await axiosSecure.patch(`/admin/users/${userId}/reject`, {
        // Reject করার কারণ backend-এ পাঠাচ্ছি
        reason,
      });

      console.log(res.data);

      if (res.data.success) {
        await onSuccess();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <ModalWrapper onClose={onClose}>
        <LoadingSpinner />
      </ModalWrapper>
    );
  }

  if (isError || !data) {
    return (
      <ModalWrapper onClose={onClose}>
        <p className="p-10 text-center text-error">
          Failed to load user details.
        </p>
      </ModalWrapper>
    );
  }

  const { user, guardian, linkedStudents } = data;

  return (
    <ModalWrapper onClose={onClose}>
      <div className="max-h-[85vh] overflow-y-auto body-font">
        {/* Header */}

        <div className="sticky top-0 z-10 border-b border-base-300 bg-base-100 p-6">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                Verification Request
              </p>

              <h2 className="mt-1 text-2xl font-black text-neutral">
                {user.name}
              </h2>

              <p className="mt-1 text-sm capitalize text-base-content/55">
                {user.accountType?.replace("_", " & ")}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="btn btn-circle btn-sm"
            >
              <FiX />
            </button>
          </div>
        </div>

        <div className="space-y-6 p-6">
          {/* ===================================================
              USER ACCOUNT INFORMATION
          ==================================================== */}

          <InformationSection title="Account Information" icon={FiUser}>
            <InfoRow
              label="Account Type"
              value={user.accountType?.replace("_", " & ")}
            />

            <InfoRow label="Status" value={user.verificationStatus} />

            {user.accountType === "teacher" && (
              <>
                <InfoRow label="Teacher's Name" value={user.displayName} />
                <InfoRow
                  label="Teacher's Email"
                  value={user.email}
                  icon={FiMail}
                />
                <InfoRow
                  label="Teacher's Joining Date"
                  value={user.teacherJoiningDate}
                  icon={FiCalendar}
                />
                <InfoRow
                  label="Teacher's Phone No."
                  value={user.teacherPhoneNo}
                  icon={FiPhone}
                />
                <InfoRow
                  label="Teacher's Campus"
                  value={user.teacherSubmittedCampus}
                  icon={FiMapPin}
                />
                <InfoRow
                  label="Teacher's Section"
                  value={user.teacherSubmittedSection}
                  icon={FiHome}
                />
                <InfoRow
                  label="Teacher's Subject"
                  value={user.teacherSubmittedSubject}
                  icon={FiBookOpen}
                />
              </>
            )}
          </InformationSection>

          {/* ===================================================
              GUARDIAN PROFILE
          ==================================================== */}

          {guardian && (
            <InformationSection title="Guardian Profile" icon={FiUsers}>
              <InfoRow label="Full Name" value={guardian.guardianName} />

              <InfoRow
                label="Phone"
                value={guardian.guardianPhoneNo}
                icon={FiPhone}
              />

              <InfoRow label="Occupation" value={guardian.guardianProfession} />

              <InfoRow label="Gender" value={guardian.guardianGender} />

              <InfoRow
                label="Address"
                value={
                  guardian.address?.presentAddress ||
                  guardian.guardianPresentAddress
                }
              />

              {guardian.children.map((child) => (
                <>
                  <InfoRow
                    label="Submitted Child ID"
                    value={child.childStudentId}
                  />
                  <InfoRow
                    label="Submitted Child Name"
                    value={child.childName}
                  />
                  <InfoRow
                    label="Submitted Child Class"
                    value={child.childClass}
                  />
                </>
              ))}
            </InformationSection>
          )}

          {/* ===================================================
              LINKED STUDENTS
          ==================================================== */}

          <InformationSection title="Linked Students" icon={FiBookOpen}>
            {linkedStudents?.length === 0 ? (
              <p className="text-sm text-base-content/50">
                No linked students found.
              </p>
            ) : (
              <div className="space-y-4">
                {linkedStudents.map((item) => (
                  <div
                    key={item.relationId}
                    className="
                      rounded-2xl border
                      border-primary/15
                      bg-primary/3
                      p-4
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div className="grid size-14 place-items-center overflow-hidden rounded-xl bg-primary/10">
                        {item.student.photoURL ? (
                          <img
                            src={item.student.photoURL}
                            alt={item.student.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FiUser className="text-xl text-primary" />
                        )}
                      </div>

                      <div>
                        <h4 className="font-black text-neutral">
                          {item.student.name}
                        </h4>

                        <p className="text-sm text-base-content/50">
                          {item.student.studentId}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <InfoRow label="Class" value={item.student.className} />

                      <InfoRow label="Section" value={item.student.section} />

                      <InfoRow label="Roll" value={item.student.roll} />

                      <InfoRow label="Relationship" value={item.relationship} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </InformationSection>

          {/* ===================================================
              REJECT REASON
          ==================================================== */}

          {rejectMode && (
            <div className="rounded-2xl border border-error/20 bg-error/4 p-5">
              <label className="font-bold text-neutral">
                Reason for rejection
              </label>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Write why this profile is being rejected..."
                className="
                  textarea textarea-bordered
                  mt-3 min-h-28 w-full
                  rounded-xl
                  focus:border-error
                  focus:outline-none
                "
              />
            </div>
          )}
        </div>

        {/* =====================================================
            FOOTER ACTION BUTTONS
        ====================================================== */}

        <div className="sticky bottom-0 border-t border-base-300 bg-base-100 p-5">
          {!rejectMode ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setRejectMode(true)}
                disabled={actionLoading}
                className="
                  btn rounded-xl
                  border-error/30
                  bg-error/10 text-error
                  hover:bg-error
                  hover:text-white
                "
              >
                <FiX />
                Reject
              </button>

              <button
                type="button"
                onClick={handleAccept}
                disabled={actionLoading}
                className="
                  btn rounded-xl
                  border-none bg-primary
                  px-7 text-white
                  hover:bg-primary/90
                "
              >
                {actionLoading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <FiCheck />
                )}
                Accept
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => {
                  setRejectMode(false);
                  setReason("");
                }}
                className="btn rounded-xl"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleReject}
                disabled={actionLoading || !reason.trim()}
                className="
                  btn rounded-xl
                  border-none bg-error
                  px-7 text-white
                  hover:bg-error/90
                "
              >
                {actionLoading ? (
                  <span className="loading loading-spinner loading-sm" />
                ) : (
                  <FiX />
                )}
                Confirm Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </ModalWrapper>
  );
};

// =====================================================
// Modal Wrapper
// =====================================================

const ModalWrapper = ({ children, onClose }) => {
  return (
    <div
      className="
        fixed inset-0 z-100
        flex items-center justify-center
        bg-neutral/55 p-4
        backdrop-blur-sm
      "
      onClick={onClose}
    >
      <div
        className="
          w-full max-w-4xl
          overflow-hidden rounded-3xl
          bg-base-100
          shadow-[0_30px_100px_rgba(0,0,0,0.30)]
        "
        onClick={(e) => {
          // Modal-এর ভিতরে click করলে
          // modal যেন close না হয়
          e.stopPropagation();
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default UserVerificationModal;
