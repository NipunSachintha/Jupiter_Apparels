import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/userSlice";
import { employeeMenu, adminMenu, hrManagerMenu } from "../../Data/data";
import { useState } from "react";
import "./home.css";
import Header from "../../components/header";

const hrmanagerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user data from Redux store
  const user = useSelector((state) => state.user);
  const [role, setRole] = useState("");
  //const {role} = useSelector((state) => state.user.role);

  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // Redirect to login page
  };

  // Dynamic Menu
  let menu;
  if (role === "Admin User") menu = adminMenu;
  else if (role === "HR Manager") menu = hrManagerMenu;
  else if (role === "Employee") menu = employeeMenu;

  useEffect(() => {
    if (!user) {
      navigate("/login"); // Redirect if user not logged in
    }
    const role = localStorage.getItem("role");
    setRole(role);
  }, [user, navigate]);

  return (
    <div className="container">
      {/* Dynamic Header */}
      <header className="header">
        <h1>Dashboard</h1>
        {role === "Admin User" && <p>Admin Menu</p>}
        {role === "Employee" && <p>Employee Menu</p>}
        {role === "HR Manager" && <p>HR Manager Menu</p>}
        {role === "" && <p>Unauthorized</p>}
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>
      

      

      {/* Navigation Menu */}
      <aside className="sidebar">
        <ul className="menu-list">
          {menu?.map((item) => (
            <li key={item.name} className="menu-item">
              <a href={item.path} className="menu-link">
                <i className={item.icon}></i> {item.name}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Welcome Section */}
        <section className="welcome">
          <h1>Welcome to Jupiter Apparels</h1>
        </section>

        {/* Employee Details Section */}
        <section className="employee-section">
          <h2>View Employee Details</h2>
          <div className="employee-card">
            <div className="employee-image"></div>
            <div className="employee-info">
              <h3>Employee Name</h3>
              <p>
                Body text for whatever you'd like to say. Add main takeaway
                points, quotes, anecdotes, or even a very short story.
              </p>
              <button className="info-btn">More Info.</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="social-icons">
          <span>Ⓑ</span>
          <a href="#">X</a>
          <a href="#">Instagram</a>
          <a href="#">YouTube</a>
          <a href="#">LinkedIn</a>
        </div>
        <div className="footer-links">
          <div className="column">
            <h4>Use cases</h4>
            <p>UI design</p>
            <p>UX design</p>
            <p>Wireframing</p>
          </div>
          <div className="column">
            <h4>Explore</h4>
            <p>Design</p>
            <p>Prototyping</p>
            <p>Development features</p>
            <p>Design systems</p>
          </div>
          <div className="column">
            <h4>Resources</h4>
            <p>Blog</p>
            <p>Best practices</p>
            <p>Colors</p>
            <p>Color wheel</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
