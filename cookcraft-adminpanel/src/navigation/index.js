import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard/UserDashboard";

import SignUp from "../../src/pages/SignUp/SignUp";
import Login from "../../src/pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Users from "../pages/Dashboard/AdminDashboard/Users";
import AddProblem from "../pages/Dashboard/AdminDashboard/AddProblem";
import Repositories from "../pages/Dashboard/UserDashboard/Repositories";
import Dashboard from "../pages/Dashboard/AdminDashboard/Dashboard";

const index = () => {
  const isAdmin = true; // Determine if user is admin

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/adminDashboard"
        element={<PrivateRoute component={<AdminDashboard />} />}
      />
      <Route
        path="/adminDashboard/*"
        element={
          <AdminDashboard>
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="addProblem" element={<AddProblem />} />
            </Routes>
          </AdminDashboard>
        }
      />
    </Routes>
  );
};

export default index;
