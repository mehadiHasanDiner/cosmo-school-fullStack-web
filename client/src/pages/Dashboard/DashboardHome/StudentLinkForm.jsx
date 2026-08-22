import { useState } from "react";
import axios from "axios";
import useDbUser from "../../../hooks/useDbUser";
import { useNavigate } from "react-router";

const StudentLinkForm = () => {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [relationship, setRelationship] = useState("");
  const [loading, setLoading] = useState(false);
  const [linking, setLinking] = useState(false);
  const [error, setError] = useState("");

  const { dbUser } = useDbUser();
  const navigate = useNavigate();

  const handleVerifyStudent = async () => {
    try {
      setLoading(true);
      setError("");
      setStudent(null);

      const res = await axios.post(
        "http://localhost:3000/guardian/student/verify",
        {
          studentId,
        },
      );

      if (res.data.success) {
        setStudent(res.data.student);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Student verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleLinkStudent = async () => {
    if (!relationship) {
      setError("Please select your relationship with the student");
      return;
    }

    try {
      setLinking(true);
      setError("");

      const res = await axios.post(
        "http://localhost:3000/guardian/student/link",
        {
          userId: dbUser._id,
          studentMongoId: student._id,
          relationship,
        },
      );

      if (res.data.success) {
        navigate("/dashboard");

        // সফল link-এর পরে form reset
        setStudentId("");
        setStudent(null);
        setRelationship("");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Student linking failed");
    } finally {
      setLinking(false);
    }
  };

  return (
    <section className="mx-auto max-w-3xl">
      <div className="rounded-3xl border border-primary/15 bg-base-100 p-6 shadow-[0_20px_50px_rgba(39,140,69,0.10)] sm:p-8">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-primary">
            Link Your Child
          </p>

          <h2 className="mt-2 text-3xl font-black text-neutral">
            Enter Student ID
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-base-content/60">
            Enter the Student ID provided by Cosmo School.
          </p>
        </div>

        <div className="mt-8">
          <label className="mb-2 block text-sm font-bold text-neutral">
            Student ID
          </label>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="CS-2026-00125"
              className="input input-bordered h-13 flex-1 rounded-xl focus:border-primary focus:outline-none"
            />

            <button
              type="button"
              onClick={handleVerifyStudent}
              disabled={loading || !studentId.trim()}
              className="btn btn-primary min-h-13 rounded-xl px-7"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Verifying...
                </>
              ) : (
                "Verify Student"
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="alert alert-error mt-5 rounded-xl">
            <span>{error}</span>
          </div>
        )}

        {student && (
          <div className="mt-8 rounded-2xl border border-success/20 bg-success/5 p-5">
            <p className="font-bold text-success">✓ Student Found</p>

            <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="grid size-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-primary/10">
                {student.photoURL ? (
                  <img
                    src={student.photoURL}
                    alt={student.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">👦</span>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-black text-neutral">
                  {student.name}
                </h3>

                <p className="mt-1 text-sm text-base-content/60">
                  Student ID: {student.studentId}
                </p>

                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                  <span className="badge badge-outline">
                    {student.className}
                  </span>

                  <span className="badge badge-outline">
                    Section {student.section}
                  </span>

                  <span className="badge badge-outline">
                    Roll {student.roll}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="mb-2 block text-sm font-bold text-neutral">
                Relationship with student
              </label>

              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="select select-bordered w-full rounded-xl focus:border-primary focus:outline-none"
              >
                <option value="">Select relationship</option>

                <option value="father">Father</option>

                <option value="mother">Mother</option>

                <option value="legal_guardian">Legal Guardian</option>

                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleLinkStudent}
              disabled={linking}
              className="btn btn-primary mt-6 w-full rounded-xl"
            >
              {linking ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Linking...
                </>
              ) : (
                "Link This Student"
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default StudentLinkForm;
