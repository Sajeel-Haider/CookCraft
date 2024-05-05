import React from "react";
import { Paper, Grid } from "@mui/material";
import UserChart from "../../../components/Dashboard/AdminDashboard/UserChart";
import DailyVisitsChart from "../../../components/Dashboard/AdminDashboard/DailyVisitsChart"; // Make sure the path is correct

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: 16, height: "100%" }}>
          <UserChart />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper style={{ padding: 16, height: "100%" }}>
          <DailyVisitsChart />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
