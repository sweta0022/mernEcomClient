import React, { useEffect,useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
// import "./AllProduct.css";
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

    const getAllProduct = async () => {
        setLoading(true);
        const data = await axios.get("/api/v1/admin/products");
        console.log(data);
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
                  <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                    <EditIcon />
                  </Link>
      
                  <Button
                    // onClick={() =>
                    //   deleteProductHandler(params.getValue(params.id, "id"))
                    // }
                  >
                    <DeleteIcon />
                  </Button>
                </>
              );
            },
          },
      
    ]

    const rows = [];

    return(
        <>
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
    )
}

export default AllProduct