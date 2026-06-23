import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `rounded-xl px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
        : "text-slate-600 hover:bg-slate-100 hover:text-blue-600"
    }`;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-3" onClick={closeMenu}>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white shadow-lg shadow-blue-600/25">
            M
          </div>

          <div>
            <h1 className="text-lg font-black tracking-tight text-slate-900">
              MERN Dashboard
            </h1>
            <p className="text-xs font-medium text-slate-500">
              User Management
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-3 md:flex">
          <NavLink to="/create" className={navLinkClass}>
            Create User
          </NavLink>

          <NavLink to="/all" className={navLinkClass}>
            All Users
          </NavLink>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-700 transition hover:bg-slate-100 md:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-3">
            <NavLink
              to="/create"
              className={navLinkClass}
              onClick={closeMenu}
            >
              Create User
            </NavLink>

            <NavLink to="/all" className={navLinkClass} onClick={closeMenu}>
              All Users
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;