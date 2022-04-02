import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar.js"
import DashboardCss from "./Dashboard.css"
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { Typography } from "@material-ui/core";
import { Label } from "@material-ui/icons";
import Chart from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
import axios from "axios";
import { useAlert } from "react-alert";


const Dashboard = () => {
  Chart.register(CategoryScale);
  const alert = useAlert();

  const [outOfStock ,setOutOfStock] = useState(0);
  const [inStock ,setInStock] = useState(0);

  useEffect(() => {
     getOutOfStockCount();
     getInStockCount();
  },[])

  const getOutOfStockCount = async () => {
    try
    {
        const response = await axios.get('/api/v1/getOutOfStockCount');
        if(response.data.status === 200)
        {
           setOutOfStock(response.data.result);
        }
        else
        {
          alert.error(response.data.message);
        }
    }
    catch(error)
    {
      alert.error(error.response.data.message); 
    }
    
  }

  const getInStockCount = async () => {
    try
    {
        const response = await axios.get('/api/v1/getInStockCount');
        if(response.data.status === 200)
        {
           setInStock(response.data.result);
        }
        else
        {
          alert.error(response.data.message);
        }
    }
    catch(error)
    {
      alert.error(error.response.data.message); 
    }
    
  }

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
    labels: ["Out of Stock","InStock"],
    datasets: [
      {
        label: "Total Amount",
        backgroundColor: ["tomato","blue"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [outOfStock, inStock],
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
                <p>{outOfStock + inStock}</p>
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