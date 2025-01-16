// src/routes/ProtectedRoute.js

import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from "../redux/features/userSlice";
import api from '../axios'

export default function ProtectedRoute({ children, allowedRoles }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch user details
  const getUser = async () => {
    try {
      const res = await api.post('/getuserData', 
        {}, 
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      if (res.data.success) {
        dispatch(setUser(res.data.data)); // Set user in Redux store
      } else {
        localStorage.removeItem('token'); // Only remove token
        navigate("/login"); // Redirect to login on failure
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      console.log(localStorage.getItem('token'));
      localStorage.removeItem('token'); // Handle invalid token
      navigate("/login"); // Redirect to login on error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    } else {
      setLoading(false); // User already exists, stop loading
    }
  }, [user]);

  // Show loading indicator or spinner if still fetching user
  if (loading) {
    return <h1>Loading...</h1>; // Replace with your spinner if needed
  }

  // Check user roles
  if (user) {
    if (allowedRoles && !allowedRoles.includes(user.Auth_Level)) {
      return <Navigate to="/unauthorized" />;
    }
    return children; // Render the protected content
  }

  // If no token in localStorage, redirect to login
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" />;
  }

  return null; // Fallback (shouldn't reach here)
}
