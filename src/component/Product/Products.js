import React, { useEffect, useState } from "react";
import "./Products.css";
import Loader from "../layout/Loader/Loader";
import Product from "../Home/Product";
import MetaData from "../layout/MetaData";
import axios from "axios";
import { useAlert } from "react-alert";
import Pagination  from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";


const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

const Products = ({match}) => {
    const customAlert = useAlert();

    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 200000]);
    const [products, setProducts] = useState([]);
    const [resultPerPage, setResultPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsCount, setProductsCount] = useState(0);
    const [filteredProductCount,setFilteredProductCount] = useState(0)
    const [category,setCategory] = useState("");
    const [ratings, setRatings] = useState(0);


    const keyword = match.params.keyword?match.params.keyword:null;
    
    useEffect( async() => {
        try
        {
            let link = `/api/v1/getAllProducts?page=${currentPage}&price_min=${price[0]}&price_max=${price[1]}&ratings=${ratings}`;
            if(keyword !== null)
            {
              link += `&keyword=${keyword}`;
              // link = `/api/v1/getAllProducts?keyword=${keyword}&page=${currentPage}&price_min=${price[0]}&price_max=${price[1]}`;
            }

            if(category !== "")
            {
              link += `&category=${category}`;
            }
            // setLoading(true);
            const response = await axios.get(link);
            
            // console.log(response.data.status);
            if(response.data.status === 200)
            {  
              setProducts(response.data.productList);
              setProductsCount(response.data.productsCount);
              setResultPerPage(response.data.resultPerPage);
              setFilteredProductCount(response.data.filteredProductCount);
            }
            else
            {
              customAlert.error(response.data.message);
            }
            // setLoading(false);
        }
        catch(err)
        { 
          // setLoading(false);
          customAlert.error(err.response.data.message);
        }
         
    
     },[currentPage,customAlert,keyword,price,category,ratings])

      const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      }

      const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
      };
      

    return(
        <>
          {loading ? ( <Loader /> ) : ( 
              <>
                 <MetaData title="PRODUCTS -- ECOMMERCE" />
                 <h2 className="productsHeading">Products</h2>

                 <div className="products">
                    {products &&
                    products.map((product) => (
                        <Product key={product._id} product={product} />
                    ))}
                </div>

            <div className="filterBox">
                  <Typography>Price</Typography>
                  <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={200000}
                  />

                  <Typography>Categories</Typography>
                  <ul className="categoryBox">
                    {categories.map((category) => (
                      <li
                        className="category-link"
                        key={category}
                        onClick={() => setCategory(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>

                  <fieldset>
                      <Typography component="legend">Ratings Above</Typography>
                      <Slider
                        value={ratings}
                        onChange={(e, newRating) => {
                          setRatings(newRating);
                        }}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                      />
                  </fieldset>

            </div>

                {
                   resultPerPage < filteredProductCount && (
                    <div className="paginationBox">
                    <Pagination
                       activePage={currentPage}
                       itemsCountPerPage={resultPerPage}
                      //  totalItemsCount={productsCount}
                       totalItemsCount={filteredProductCount}
                       onChange={setCurrentPageNo}
                       nextPageText="Next"
                       prevPageText="Prev"
                       firstPageText="1st"
                       lastPageText="Last"
                       itemClass="page-item"
                       linkClass="page-link"
                       activeClass="pageItemActive"
                       activeLinkClass="pageLinkActive"
                    />
              </div>
                   )
                }
              </>
           )}
        </>
    )
}

export default Products