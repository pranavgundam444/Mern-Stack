import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Trash2 } from "lucide-react";

const API_URL = "https://mern-backend-ytca.onrender.com";

const Read = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [deleteId, setDeleteId] = useState(null);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const getData = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || result.message || "Failed to fetch employees");
        return;
      }

      setData(Array.isArray(result) ? result : result.employees || []);
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
    const previousData = data;
    
    // setDeletingId(id);
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
        setError("Failed to delete employee");
        toast.error("Failed To Delete Employee");
        return;
      }

      // setSuccessMessage("Employee deleted successfully");
      setOpenDeleteModal(false);
      toast.success("Employee Data Deleted Successfully");
    } catch (err) {
      setData(previousData);
      // setError("Something went wrong while deleting");
      toast.error("Something Went Wrong");
    } finally {
      setDeletingId("");
    }
  };

  const departments = useMemo(() => {
    const uniqueDepartments = data
      .map((employee) => employee.department)
      .filter(Boolean);

    return ["All", ...new Set(uniqueDepartments)];
  }, [data]);

  const filteredEmployees = useMemo(() => {
    let employees = [...data];

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();

      employees = employees.filter((employee) => {
        return (
          employee.name?.toLowerCase().includes(lowerSearch) ||
          employee.email?.toLowerCase().includes(lowerSearch) ||
          employee.employeeId?.toLowerCase().includes(lowerSearch) ||
          employee.designation?.toLowerCase().includes(lowerSearch)
        );
      });
    }

    if (departmentFilter !== "All") {
      employees = employees.filter(
        (employee) => employee.department === departmentFilter,
      );
    }

    if (statusFilter !== "All") {
      employees = employees.filter(
        (employee) => employee.status === statusFilter,
      );
    }

    if (sortBy === "name") {
      employees.sort((a, b) => (a.name || "").localeCompare(b.name || ""));
    }

    if (sortBy === "salaryHigh") {
      employees.sort((a, b) => Number(b.salary || 0) - Number(a.salary || 0));
    }

    if (sortBy === "salaryLow") {
      employees.sort((a, b) => Number(a.salary || 0) - Number(b.salary || 0));
    }

    if (sortBy === "newest") {
      employees.sort(
        (a, b) =>
          new Date(b.createdAt || b.joiningDate) -
          new Date(a.createdAt || a.joiningDate),
      );
    }

    if (sortBy === "oldest") {
      employees.sort(
        (a, b) =>
          new Date(a.createdAt || a.joiningDate) -
          new Date(b.createdAt || b.joiningDate),
      );
    }

    return employees;
  }, [data, searchTerm, departmentFilter, statusFilter, sortBy]);

  const totalEmployees = data.length;
  const activeEmployees = data.filter(
    (employee) => employee.status === "Active",
  ).length;
  const inactiveEmployees = data.filter(
    (employee) => employee.status === "Inactive",
  ).length;
  const totalDepartments = departments.length > 0 ? departments.length - 1 : 0;

  const formatSalary = (salary) => {
    if (!salary) return "N/A";

    return Number(salary).toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    });
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/70 border border-slate-200 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Employee Management
            </p>

            <h1 className="mt-2 text-3xl font-bold text-slate-900">
              Employees Dashboard
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              View, search, filter, edit and manage employee records from one
              place.
            </p>
          </div>

          <Link
            to="/create"
            className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
          >
            + Add New Employee
          </Link>
        </div>

        <div className="mb-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
            <p className="text-sm font-semibold text-slate-500">
              Total Employees
            </p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">
              {totalEmployees}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
            <p className="text-sm font-semibold text-slate-500">
              Active Employees
            </p>
            <h2 className="mt-3 text-3xl font-black text-green-600">
              {activeEmployees}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
            <p className="text-sm font-semibold text-slate-500">
              Inactive Employees
            </p>
            <h2 className="mt-3 text-3xl font-black text-red-600">
              {inactiveEmployees}
            </h2>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70">
            <p className="text-sm font-semibold text-slate-500">Departments</p>
            <h2 className="mt-3 text-3xl font-black text-blue-600">
              {totalDepartments}
            </h2>
          </div>
        </div>

        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/70">
          <div className="grid gap-4 md:grid-cols-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Search Employee
              </label>
              <input
                type="text"
                placeholder="Search by name, email, ID..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Department
              </label>
              <select
                value={departmentFilter}
                onChange={(event) => setDepartmentFilter(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
                <option value="salaryHigh">Salary High to Low</option>
                <option value="salaryLow">Salary Low to High</option>
              </select>
            </div>
          </div>
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
              Loading employees...
            </p>
          </div>
        ) : filteredEmployees.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-lg border border-slate-200">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-2xl">
              👤
            </div>

            <h2 className="mt-4 text-xl font-bold text-slate-900">
              No employees found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filter options.
            </p>

            <Link
              to="/create"
              className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              Add Employee
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredEmployees.map((employee) => (
              <div
                key={employee._id}
                className="group rounded-3xl border border-slate-200 bg-white p-6 shadow-lg shadow-slate-200/70 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-xl font-bold text-blue-700">
                      {employee.name
                        ? employee.name.charAt(0).toUpperCase()
                        : "E"}
                    </div>

                    <div>
                      <h2 className="line-clamp-1 text-lg font-bold text-slate-900">
                        {employee.name || "Unnamed Employee"}
                      </h2>

                      <p className="mt-1 line-clamp-1 text-sm text-slate-500">
                        {employee.email || "No email available"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      employee.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}
                  >
                    {employee.status || "N/A"}
                  </span>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Employee ID
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {employee.employeeId || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Age
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {employee.age || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Department
                    </p>
                    <p className="mt-1 line-clamp-1 text-sm font-bold text-slate-900">
                      {employee.department || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Type
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {employee.employmentType || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl bg-blue-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                    Designation
                  </p>
                  <p className="mt-1 text-sm font-bold text-slate-900">
                    {employee.designation || "N/A"}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      Salary
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {formatSalary(employee.salary)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      Joining Date
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-900">
                      {formatDate(employee.joiningDate)}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    to={`/${employee._id}`}
                    className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-center text-sm font-bold text-slate-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700"
                  >
                    Edit
                  </Link>

                  <button
                    type="button"
                    onClick={() => {
                      setOpenDeleteModal(true);
                      setDeletingId(employee._id);
                    }}
                    disabled={deletingId === employee._id}
                    className="flex-1 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {deletingId === employee._id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {openDeleteModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
          <div className="bg-white rounded-lg w-[360px] shadow-xl flex flex-col items-center gap-2 text-center p-5">
            <div className="bg-red-100 flex justify-center items-center rounded-full w-20 h-20">
              <Trash2
                size={48}
                className="bg-red-600 p-2 rounded-full text-white"
              />
            </div>

            <h1 className="font-bold text-xl text-gray-800">Delete Banner?</h1>

            <p className="text-sm text-gray-600">
              Are you sure you want to delete this banner?
              <br />
              Once deleted, it cannot be undone.
            </p>

            <div className="flex justify-center gap-4 mt-3 w-full">
              <button
                className="bg-black rounded-lg w-1/2 py-3 text-white font-semibold shadow-lg cursor-pointer"
                onClick={() => {
                  setOpenDeleteModal(false);
                  setDeletingId(null);
                }}
              >
                Cancel
              </button>

              <button
                className="bg-red-600 rounded-lg py-3 w-1/2 text-white font-semibold shadow-lg cursor-pointer"
                onClick={() => handleDelete(deletingId)}
              >
                Delete Banner
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Read;
