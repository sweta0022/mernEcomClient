import React, { useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "./../layout/MetaData";
import { getAllProducts } from "./../../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {  // useSelector is used to fetch data from state
  const dispatch = useDispatch(); 
  const alert = useAlert();

 
  const { loading, error, products } = useSelector( 
    (state) => state.products
  );



  useEffect( () => {
    if(error)
    {
      alert.error(error);
    }
    else
    {
      dispatch( getAllProducts()); 
    }

  },[dispatch, error, alert] )

  // const product = {
  //   name: "Blue Tshirt",
  //   images:[{ url: "https://i.ibb.co/DRST11n/1.webP" }],
  //   price: 3000,
  //   _id: "seta",
  // }

    return (
        <>
        <MetaData title="E-COMMERCE" />
            <div className="banner">
                  <p>Welcome to Ecommerce</p>
                  <h1>FIND AMAZING PRODUCTS BELOW</h1>

                  <a href="#container">
                  <button>
                      Scroll <CgMouse />
                  </button>
                  </a>
            </div>
            <h2 className="homeHeading">Featured Products</h2>

          { loading ? 
              (
                <Loader/>
              ):
              (
                <>    
                
                  <div className="container" id="container">
                  {
                      products && products.map( (product) => {
                        return (
                          <Product product={product}/>
                        );
                      } )
                  }
                  
                  </div>               
                </>
              )
            
            }
        </>
    );
}

export default Home