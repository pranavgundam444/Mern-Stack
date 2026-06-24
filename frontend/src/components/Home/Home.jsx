import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="glow glow-one"></div>
        <div className="glow glow-two"></div>
        <div className="floating-shape shape-one"></div>
        <div className="floating-shape shape-two"></div>
        <div className="floating-shape shape-three"></div>

        <div className="hero-content">
          <div className="badge">MERN Stack Project</div>

          <h1>
            Employee Management
            <span> Dashboard</span>
          </h1>

          <p>
            Manage employees, departments, roles, salary details, and status
            from one clean and responsive dashboard.
          </p>

          <div className="hero-actions">
            <Link to="/create" className="primary-btn">
              Add Employee
            </Link>

            <Link to="/all" className="secondary-btn">
              View Employees
            </Link>
          </div>

          <div className="stats-row">
            <div>
              <h3>CRUD</h3>
              <p>Operations</p>
            </div>

            <div>
              <h3>MongoDB</h3>
              <p>Database</p>
            </div>

            <div>
              <h3>REST</h3>
              <p>API</p>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="dashboard-card">
            <div className="card-header">
              <div>
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>Employee Overview</p>
            </div>

            <div className="profile-box">
              <div className="avatar">P</div>
              <div>
                <h4>Pranav Gundam</h4>
                <p>Frontend Developer</p>
              </div>
              <span className="active-pill">Active</span>
            </div>

            <div className="mini-grid">
              <div>
                <p>Employee ID</p>
                <h4>EMP001</h4>
              </div>

              <div>
                <p>Department</p>
                <h4>Engineering</h4>
              </div>

              <div>
                <p>Type</p>
                <h4>Full Time</h4>
              </div>

              <div>
                <p>Salary</p>
                <h4>₹25,000</h4>
              </div>
            </div>

            <div className="progress-section">
              <div className="progress-info">
                <p>Profile Completion</p>
                <span>86%</span>
              </div>
              <div className="progress-bar">
                <div></div>
              </div>
            </div>
          </div>

          <div className="small-card card-one">
            <h4>42+</h4>
            <p>Total Employees</p>
          </div>

          <div className="small-card card-two">
            <h4>8</h4>
            <p>Departments</p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <p>Dashboard Features</p>
          <h2>Built to look like a real company dashboard</h2>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Employee CRUD</h3>
            <p>
              Create, view, update, and delete employees with complete profile
              details.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Dashboard Summary</h3>
            <p>
              Show total employees, active users, inactive users, and department
              stats.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Search & Filters</h3>
            <p>
              Search employees by name, email, employee ID, department, and
              status.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;