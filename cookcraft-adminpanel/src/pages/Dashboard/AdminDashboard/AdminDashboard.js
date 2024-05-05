import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Dashboard/AdminDashboard/Sidebar";
import { SidebarItem } from "../../../components/Dashboard/AdminDashboard/Sidebar";
import { IoMdSettings } from "react-icons/io";
import { MdSpaceDashboard } from "react-icons/md";
import { ImStatsDots } from "react-icons/im";
import { FaUsers } from "react-icons/fa";
import { Typography, Paper } from "@mui/material";
import UserChart from "../../../components/Dashboard/AdminDashboard/UserChart"; // Assuming this is a component you will create for charting user stats

const AdminDashboard = ({ children }) => {
  const navigate = useNavigate();

  const updateNavigateUrl = (route) => {
    navigate(`/adminDashboard/${route}`);
  };

  return (
    <div className="flex flex-row bg-primary_color">
      <Sidebar>
        <SidebarItem
          icon={<MdSpaceDashboard />}
          text="Dashboard"
          onClick={() => updateNavigateUrl("dashboard")}
        />
        <SidebarItem
          icon={<ImStatsDots />}
          text="Statistics"
          onClick={() => updateNavigateUrl("statistics")}
        />
        <SidebarItem
          icon={<FaUsers />}
          text="Users"
          onClick={() => updateNavigateUrl("users")}
        />
        <hr className="my-3" />
        <SidebarItem
          icon={<IoMdSettings />}
          text="Settings"
          onClick={() => updateNavigateUrl("settings")}
        />
      </Sidebar>
      <div className="flex-grow p-4">{children}</div>
    </div>
  );
};

export default AdminDashboard;
