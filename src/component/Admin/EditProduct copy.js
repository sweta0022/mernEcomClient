import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import { clearErrors,getProductDetails } from "./../../actions/productActions";
import SideBar from "./Sidebar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";


const EditProduct = ({match,history}) => {
    const dispatch = useDispatch(); 
    const { product  } = useSelector( (state) => state.productDetails );
      const alert = useAlert();

    const [loading, setLoading ] = useState("");
    const [name, setName ] = useState("");
    const [price, setPrice ] = useState(0);
    const [description, setDescription ] = useState("");
    const [category, setCategory ] = useState("");
    const [stock, setStock ] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
      ];

      const productId = match.params.id;

      useEffect(() => {
        
        dispatch(getProductDetails(productId));
        setName('product.name');
        if(product)
        {  
            //   setName('product.name');
            //   setPrice('product.price');
            //   setDescription('product.description');
            //   setCategory(product.category);
            //   setStock(product.Stock);
            //   setOldImages(product.images);
        } 

       
      
      },[product,dispatch,productId])
    // },[dispatch,product,productId,error,alert])
    // },[alert,dispatch,error,product, history,productId,match.params.id])

    
      const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
    
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

    const updateProductSubmitHandler = async(e) => {
        e.preventDefault();
     
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", stock);

        images.forEach((image) => {
            myForm.append("pro_image", image);
        });

       
      
    try{
        setLoading(true);
        const config = { headers: { "Content-Type": "application/json" } };
        const response = await axios.put(`/api/v1/admin/product/${productId}`,
            myForm,
            config
        );

        // const data = await response.json(response);
        setLoading(false);
        if(response.data.status === 200)
        {
            alert.success(response.data.message);
            history.push('/admin/all-products');
        }
        else
        {
            alert.success(response.data.message);
        }
    }
    catch(error)
    {
      alert.error(error.data.message); 
    }

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
                    onSubmit={updateProductSubmitHandler}
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
                        value={price}
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
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
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
                        value={stock}
                    />
                    </div>

                    <div id="createProductFormFile">
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateProductImagesChange}
                        multiple
                    />
                    </div>

                    <div id="createProductFormImage">
                    {oldImages &&
                        oldImages.map((image, index) => (
                        <img key={index} src={image.url} alt="Old Product Preview" />
                        ))}
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

export default EditProduct;