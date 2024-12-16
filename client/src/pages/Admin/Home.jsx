import React from "react";
import "./home.css";
import Header from '../../components/header';

const Home = () => {
  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="logo">B</div>
        <nav className="nav-links">
          <a href="#">Customize Leave Allowances</a>
          <a href="#">Manage Employees</a>
          <a href="#">Manage Users</a>
          <a href="#">Manage Custom Fields</a>
          <a href="#">Edit Table Attributes</a>
          <a href="#">Profile</a>
          <button className="logout-btn">Log out</button>
        </nav>
      </header>

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
              Body text for whatever you'd like to say. Add main takeaway points,
              quotes, anecdotes, or even a very very short story.
            </p>
            <button className="info-btn">More Info.</button>
          </div>
        </div>
      </section>

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
