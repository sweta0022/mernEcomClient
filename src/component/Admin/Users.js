import React, { useEffect,useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AllProduct.css";
import Loader from "../layout/Loader/Loader";

import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import axios from "axios";

const Users = () => {
    const alert = useAlert();

    const [loading , setLoading] = useState(false);
    const [users , setUsers] = useState([]);

    const getAllUsers = async () => {
        try
        {
            setLoading(true);
            const data = await axios.get("/api/v1/admin/user/list");
            setLoading(false);
           if( data.data.status === 200 )
           {
            setUsers(data.data.data);
           }
           else
           {
            alert.error(data.data.message);
           }
        }
        catch(err)
        {          
          alert.error(err.response.data.message); 
        }    
       
    }

    const deleteUserHandler = async(id) => {
      setLoading(true);
      try
      {
        const response = await axios.delete(`/api/v1/admin/user/${id}`);
       
        if(response.data.status)
        {
          alert.success(response.data.message);
          getAllUsers();
          setLoading(false);
        }
        else
        {
          alert.error(response.data.message);
        }
        
      }
      catch(error)
      {
        setLoading(false);
        alert.error(error.response.data.message);
      }
    }

    useEffect(() => {
        getAllUsers();
    },[])


    const columns = [
        { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 150,
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            type: "number",
            minWidth: 200,
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            type: "number",
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => {
                return params.getValue(params.id, "role") === "admin"
                  ? "greenColor"
                  : "redColor";
              },
        },
        // {
        //     field: "actions",
        //     flex: 0.3,
        //     headerName: "Actions",
        //     minWidth: 150,
        //     type: "number",
        //     sortable: false,
        //     renderCell: (params) => {
        //       return (
        //         <>
        //           <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
        //             <EditIcon />
        //           </Link>
      
        //           <Button
        //             onClick={() =>
        //               deleteUserHandler(params.getValue(params.id, "id"))
        //             }
        //           >
        //             <DeleteIcon />
        //           </Button>
        //         </>
        //       );
        //     },
        //   },
      
    ]

    const rows = [];
    users &&
    users.forEach((user) => {
      rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    });

    return( <>
        {loading?<Loader/>:<>
          <MetaData title={`ALL USERS - Admin`} />

           <div className="dashboard">
           <SideBar />
           <div className="productListContainer">
               <h1 id="productListHeading">ALL USERS</h1>

               <DataGrid
               rows={rows}
               columns={columns}
               pageSize={10}
               disableSelectionOnClick
               className="productListTable"
               autoHeight
               />
           </div>
           </div>
           </>
        }
       </>)
}

export default Users