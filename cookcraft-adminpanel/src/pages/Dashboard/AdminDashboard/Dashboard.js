import React, { useState, useEffect } from "react";
import { Paper, Grid, Typography } from "@mui/material";
import axios from "axios";
import UserChart from "../../../components/Dashboard/AdminDashboard/UserChart";
import DailyVisitsChart from "../../../components/Dashboard/AdminDashboard/DailyVisitsChart";

const Dashboard = () => {
  const [numRecipes, setNumRecipes] = useState(0);

  useEffect(() => {
    const fetchNumRecipes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/recipes`
        );
        console.log(response.data.length);
        setNumRecipes(response.data.length);
      } catch (error) {
        console.error("Error fetching number of recipes:", error);
      }
    };

    fetchNumRecipes();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Paper style={{ padding: 16, height: "100%" }}>
          <Typography variant="h6">Number of Recipes</Typography>
          <Typography variant="h4">{numRecipes}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper style={{ padding: 16, height: "100%" }}>
          <UserChart />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
