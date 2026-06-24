import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "https://mern-backend-ytca.onrender.com";

const Create = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [employmentType, setEmploymentType] = useState("Full Time");
  const [status, setStatus] = useState("Active");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

  const validateForm = () => {
    if (!employeeId.trim()) {
      return "Employee ID is required";
    }

    if (!name.trim()) {
      return "Full name is required";
    }

    if (!email.trim()) {
      return "Email address is required";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    if (!phone.trim()) {
      return "Phone number is required";
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return "Phone number must be 10 digits";
    }

    if (!age) {
      return "Age is required";
    }

    if (Number(age) < 18 || Number(age) > 60) {
      return "Age must be between 18 and 60";
    }

    if (!department.trim()) {
      return "Department is required";
    }

    if (!designation.trim()) {
      return "Designation is required";
    }

    if (!salary) {
      return "Salary is required";
    }

    if (Number(salary) <= 0) {
      return "Salary must be greater than 0";
    }

    if (!joiningDate) {
      return "Joining date is required";
    }

    return "";
  };

  const resetForm = () => {
    setEmployeeId("");
    setName("");
    setEmail("");
    setPhone("");
    setAge("");
    setDepartment("");
    setDesignation("");
    setSalary("");
    setJoiningDate("");
    setEmploymentType("Full Time");
    setStatus("Active");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError("");

    const addEmployee = {
      employeeId,
      name,
      email,
      phone,
      age: Number(age),
      department,
      designation,
      salary: Number(salary),
      joiningDate,
      employmentType,
      status,
    };

    const options = {
      method: "POST",
      body: JSON.stringify(addEmployee),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(API_URL, options);
      const result = await response.json();

      if (!response.ok) {
        setError(result.error || result.message || "Failed to create employee");
        return;
      }

      resetForm();
      navigate("/all");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-slate-900 px-8 py-7">
            <p className="text-sm font-medium text-blue-300 uppercase tracking-wider">
              Employee Management
            </p>

            <h1 className="mt-2 text-3xl font-bold text-white">
              Add New Employee
            </h1>

            <p className="mt-2 text-sm text-slate-300">
              Add employee personal, job, and salary details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Employee ID
                </label>
                <input
                  type="text"
                  placeholder="EMP001"
                  value={employeeId}
                  onChange={(event) => setEmployeeId(event.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className={inputClass}
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
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="Enter 10-digit phone number"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  maxLength={10}
                  className={inputClass}
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
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(event) => setDepartment(event.target.value)}
                  className={inputClass}
                >
                  <option value="">Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Finance">Finance</option>
                  <option value="Sales">Sales</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operations">Operations</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Designation
                </label>
                <input
                  type="text"
                  placeholder="Frontend Developer"
                  value={designation}
                  onChange={(event) => setDesignation(event.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Salary
                </label>
                <input
                  type="number"
                  placeholder="Enter salary"
                  value={salary}
                  onChange={(event) => setSalary(event.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Joining Date
                </label>
                <input
                  type="date"
                  value={joiningDate}
                  onChange={(event) => setJoiningDate(event.target.value)}
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Employment Type
                </label>
                <select
                  value={employmentType}
                  onChange={(event) => setEmploymentType(event.target.value)}
                  className={inputClass}
                >
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Intern">Intern</option>
                  <option value="Contract">Contract</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Employee Status
                </label>
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                  className={inputClass}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={resetForm}
                className="flex-1 rounded-xl border border-slate-300 px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Reset
              </button>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                {loading ? "Creating Employee..." : "Create Employee"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;