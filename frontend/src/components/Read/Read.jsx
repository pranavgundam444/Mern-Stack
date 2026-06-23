import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = "https://mern-backend-ytca.onrender.com";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const getData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || "Failed to fetch users");
        return;
      }

      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    const previousData = data;

    setDeletingId(id);
    setError("");
    setSuccessMessage("");

    const updatedData = data.filter((item) => item._id !== id);
    setData(updatedData);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        setData(previousData);
        setError("Failed to delete user");
        return;
      }

      setSuccessMessage("User deleted successfully");
    } catch (err) {
      setData(previousData);
      setError("Something went wrong while deleting");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/70 border border-slate-200 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              User Management
            </p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              All Users
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              View, edit and manage all registered users from one place.
            </p>
          </div>

          <Link
            to="/create"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            + Add New User
          </Link>
        </div>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-sm font-semibold text-green-700">
            {successMessage}
          </div>
        )}

        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-lg border border-slate-200">
            <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600"></div>
            <p className="mt-4 text-sm font-semibold text-slate-500">
              Loading users...
            </p>
          </div>
        ) : data.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-lg border border-slate-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
              👤
            </div>
            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No users found
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Start by creating your first user.
            </p>
            <Link
              to="/create"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Create User
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {data.map((user) => (
              <div
                key={user._id}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-700">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>

                    <div>
                      <h2 className="line-clamp-1 text-lg font-bold text-slate-900">
                        {user.name || "Unnamed User"}
                      </h2>
                      <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                        {user.email || "No email available"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Age
                  </p>
                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {user.age || "N/A"}
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    to={`/${user._id}`}
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-bold text-slate-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => handleDelete(user._id)}
                    disabled={deletingId === user._id}
                    className="flex-1 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === user._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Read;