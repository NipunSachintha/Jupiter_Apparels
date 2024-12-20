import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/login", { username, password });
      const { token, role } = res.data;

      // Save token and role to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      console.log("role",role);

      // Navigate based on user role
      if (role === "Admin User") {
        navigate("/admin-dashboard");
      } else if (role === "HR Manager") {
        navigate("/HRmanager-dashboard");
      } else if (role === "Second Manager") {
        navigate("/Secmanager-dashboard");
      }else if(role === "Employee"){
        navigate("/employee-dashboard");
      }else {
        navigate("/home"); // Default route if role is unknown
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
