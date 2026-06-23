import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

const API_URL = "https://mern-backend-ytca.onrender.com";

const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const updateData = async () => {
    setFetchingUser(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/${id}`);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to fetch user details");
        return;
      }

      setName(result.name || "");
      setEmail(result.email || "");
      setAge(result.age || "");
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setFetchingUser(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const updatedUser = {
      name,
      email,
      age,
    };

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        body: JSON.stringify(updatedUser),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to update user");
        return;
      }

      setName("");
      setEmail("");
      setAge("");
      navigate("/all");
    } catch (err) {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateData();
  }, [id]);

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        <div className="mb-5">
          <Link
            to="/all"
            className="inline-flex items-center text-sm font-semibold text-slate-600 transition hover:text-blue-600"
          >
            ← Back to users
          </Link>
        </div>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/80">
          <div className="bg-slate-900 px-8 py-7">
            <p className="text-sm font-medium uppercase tracking-wider text-blue-300">
              User Management
            </p>
            <h1 className="mt-2 text-3xl font-bold text-white">
              Update User
            </h1>
            <p className="mt-2 text-sm text-slate-300">
              Modify user details and save the latest information.
            </p>
          </div>

          {fetchingUser ? (
            <div className="p-10 text-center">
              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
              <p className="mt-4 text-sm font-semibold text-slate-500">
                Loading user details...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 p-8">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Age
                </label>
                <input
                  type="number"
                  placeholder="Enter age"
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/all"
                  className="flex-1 rounded-xl border border-slate-300 px-5 py-3.5 text-center text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-blue-400"
                >
                  {loading ? "Updating..." : "Update User"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Update;