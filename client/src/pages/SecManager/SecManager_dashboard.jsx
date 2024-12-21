import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/userSlice";
import "../Admin/home.css";

const SecManager_dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get user data from Redux store
  const user = useSelector((state) => state.user);

  //const {role} = useSelector((state) => state.user.role);

  // Logout handler
  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirect to login page
  };

  useEffect(() => {
      if (!user) {
        navigate("/"); // Redirect if user not logged in
      }
    }, [user, navigate]);



    return (
      <div className="container">
        <header className="header horizontal-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <nav className="header-nav">
            <button className="nav-btn">Dashboard</button>
            <button className="nav-btn">Approve / Reject Leave</button>
            <button className="nav-btn">Manage Users</button>
            <button className="nav-btn">Profile</button>
          </nav>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </header>
  
        {/* Navigation Menu */}
        <aside className="sidebar">
          <ul className="menu-list">
            {/* Placeholder for dynamic menu */}
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


export default SecManager_dashboard;
