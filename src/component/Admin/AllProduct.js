import React, { useEffect,useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import "./AllProduct.css";
import Loader from "../layout/Loader/Loader";
// import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SideBar from "./Sidebar";
import axios from "axios";

const AllProduct = ({ history }) => {
    const alert = useAlert();

    const [loading , setLoading] = useState(false);
    const [products , setProducts] = useState([]);
    // const [error , setError] = useState(false);

    const getAllProduct = async () => {
        try
        {
            setLoading(true);
            const data = await axios.get("/api/v1/admin/products");
            setLoading(false);
           if( data.data.status === 200 )
           {
             setProducts(data.data.result);
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

    const deleteProductHandler = async(id) => {
      setLoading(true);
      try
      {
        const response = await axios.delete(`/api/v1/admin/product/${id}`);
       
        if(response.data.status)
        {
          alert.success(response.data.message);
          getAllProduct();
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
        getAllProduct();
    },[])

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
              return (
                <>
                  <Link to={`/admin/product/edit/${params.getValue(params.id, "id")}`}>
                    <EditIcon />
                  </Link>
      
                  <Button
                    onClick={() =>
                      deleteProductHandler(params.getValue(params.id, "id"))
                    }
                  >
                    <DeleteIcon />
                  </Button>
                </>
              );
            },
          },
      
    ]

    const rows = [];

    
    products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });
    

    return(
        <>
         {loading?<Loader/>:<>
           <MetaData title={`ALL PRODUCTS - Admin`} />

            <div className="dashboard">
            <SideBar />
            <div className="productListContainer">
                <h1 id="productListHeading">ALL PRODUCTS</h1>

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
        </>
       
    )
}

export default AllProduct