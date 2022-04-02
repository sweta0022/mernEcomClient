import React, { useState } from "react";
import "./CreateProduct.css";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";

const CreateProduct = ({history}) => {
    const alert = useAlert();

    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [description,setDescription] = useState("");
    const [category,setCategory] = useState("");
    const [stock,setStock] = useState("");
    const [images,setImages] = useState([]);
    const [imagesPreview,setImagesPreview] = useState([]);
    const [loading,setLoading] = useState(false);

    

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
      ];

    const createProductSubmitHandler = async (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", stock);
      
    try{
        setLoading(true);
        const response = await fetch('/api/v1/admin/product/create',{
            method: "POST",
            body: myForm
        });

        const data = await response.json(response);
        setLoading(false);
        if(data.status === 200)
        {
            alert.success(data.message);
            history.push('/admin/products');
        }
        else
        {
            alert.success(data.message);
        }
    }
    catch(error)
    {
      alert.error(error.data.message); 
    }


         
    }

    const createProductImagesChange = async (e) => {
        const files = Array.from(e.target.files);
        setImages([]);
        setImagesPreview([]);
        files.forEach((file) => {
            const reader = new FileReader();
      
            reader.onload = () => {
              if (reader.readyState === 2) {
                setImagesPreview((old) => [...old, reader.result]);
                setImages((old) => [...old, reader.result]);
              }
            };
      
            reader.readAsDataURL(file);
          });
    }

    return(
        <>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                <form
                    className="createProductForm"
                    encType="multipart/form-data"
                    onSubmit={createProductSubmitHandler}
                >
                    <h1>Create Product</h1>

                    <div>
                    <SpellcheckIcon />
                    <input
                        type="text"
                        placeholder="Product Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                    <div>
                    <AttachMoneyIcon />
                    <input
                        type="number"
                        placeholder="Price"
                        required
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    </div>

                    <div>
                    <DescriptionIcon />

                    <textarea
                        placeholder="Product Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        cols="30"
                        rows="1"
                    ></textarea>
                    </div>

                    <div>
                    <AccountTreeIcon />
                    <select onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Choose Category</option>
                        {categories.map((cate) => (
                        <option key={cate} value={cate}>
                            {cate}
                        </option>
                        ))}
                    </select>
                    </div>

                    <div>
                    <StorageIcon />
                    <input
                        type="number"
                        placeholder="Stock"
                        required
                        onChange={(e) => setStock(e.target.value)}
                    />
                    </div>

                    <div id="createProductFormFile">
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={createProductImagesChange}
                        multiple
                    />
                    </div>

                    <div id="createProductFormImage">
                    {imagesPreview.map((image, index) => (
                        <img key={index} src={image} alt="Product Preview" />
                    ))}
                    </div>

                    <Button
                    id="createProductBtn"
                    type="submit"
                    disabled={loading ? true : false}
                    >
                    Create
                    </Button>
                </form>
                </div>
            </div>
        </>
    )
}

export default CreateProduct