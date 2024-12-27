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

      // Navigate based on user role
      if (role === "Admin User") {
        navigate("/admin-dashboard");
      } else if (role === "HR Manager") {
        navigate("/HRmanager-dashboard");
      } else if (role === "Second Manager") {
        navigate("/Secmanager-dashboard");
      } else if (role === "Employee") {
        navigate("/employee-dashboard");
      } else {
        navigate("/home");
      }
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-purple-300 opacity-20 rounded-xl"></div>
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-blue-500 opacity-30 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-pink-500 opacity-30 rounded-full blur-3xl"></div>
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-6 animate-fade-in">
          Welcome Back
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400">
              <i className="fas fa-user"></i>
            </div>
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400">
              <i className="fas fa-lock"></i>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg shadow-md font-semibold hover:from-blue-600 hover:to-purple-600 transition-transform transform hover:scale-105"
          >
            Login
          </button>
        </form>
        {error && (
          <p className="mt-4 text-sm text-red-500 text-center animate-shake">
            {error}
          </p>
        )}
        <p className="mt-6 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-blue-600 hover:underline font-semibold transition"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
