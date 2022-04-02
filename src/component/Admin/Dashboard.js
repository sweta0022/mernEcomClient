import React from "react";
import Sidebar from "./Sidebar.js"
import DashboardCss from "./Dashboard.css"
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { Typography } from "@material-ui/core";
import { Label } from "@material-ui/icons";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js';


const Dashboard = () => {
  Chart.register(CategoryScale);
  const lineState = {
    labels: ["Initial Amount","Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 400],
      }      
    ],
  };

  const doughnutState = {
    labels: ["Initial Amount","Amount Earned"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, 400],
      }      
    ],
  };

    return(
        <div className="dashboard">
        <MetaData title="Dashboard - Admin Panel" />
        <Sidebar />
  
        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>
  
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ₹2000
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Product</p>
                <p>50</p>
              </Link>
             
            
            </div>
          </div>
  
          <div className="lineChart">
            <Line data={lineState} />
          </div>
  
          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    )
}

export default Dashboard