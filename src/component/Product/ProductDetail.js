import './ProductDetail.css';
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
// import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import { getProductDetails } from "./../../actions/productActions";
import Loader from "./../layout/Loader/Loader";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";

const ProductDetail = ({match}) => {



    const dispatch = useDispatch(); 
    // const alert = useAlert();
    
    const { loading,error,product } = useSelector( (state) =>state.productDetails );

    useEffect( () => {  
    
        if(error)
        {
          alert.error(error);
        }
        else
        {  
            dispatch( getProductDetails(match.params.id) );
        }
       
    },[dispatch,error, match.params.id] )

    const options = {
        edit: false,
        color: "Grey",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product && product.rating,
        isHalf: true,
    }



    return(        
        <>  
            {   
                loading ? ( <Loader/> ) :
                (
                    <>
                        {/* <div className="banner">
                            <p>Welcome to Ecommerce</p>
                            <h1>FIND AMAZING PRODUCTS BELOW</h1>

                            <a href="#container">
                            <button>
                                Scroll
                            </button>
                            </a>
                        </div> */}

                        <div className="ProductDetails" >
                            <div>
                                <Carousel>
                                    { 
                                    product && product.images &&
                                        product.images.map((item, i) => (   
                                                                        
                                            <img
                                            className="CarouselImage"
                                            key={i}
                                            src="https://i.ibb.co/DRST11n/1.webP"
                                            // src={"http://localhost:3001"+item.uri}
                                            alt={`${i} Slide`}
                                            width="500px"
                                            />
                                        ))
                                    }
                                </Carousel>
                            </div>

                            <div>
                                <div className="detailsBlock-1">
                                    <h2>{product && product.name}</h2>
                                    <p>Product # {product && product._id}</p>
                                </div>

                                <div className="detailsBlock-2">
                                    <ReactStars {...options} />
                                    <span className="detailsBlock-2-span">
                                   
                                    ({ product && product.numOfReviews} Reviews)
                                    </span>
                                </div>
                                <div className="detailsBlock-3">
                                    <h1>{`₹${product && product.price}`}</h1>
                                    <div className="detailsBlock-3-1">
                                        <div className="detailsBlock-3-1-1">
                                            <button>-</button>
                                            <input type="number" value="1" />
                                            <button>+</button>
                                        </div>
                                        <button >
                                            Add to Cart
                                        </button>
                                    </div>

                                    <p>
                                    Status:
                                        <b className="greenColor">
                                            InStock
                                        </b>
                                    </p>
                                    
                                </div>

                                <div className="detailsBlock-4">
                                    Description : <p>{ product && product.description}</p>
                                </div>

                                <button className="submitReview">
                                    Submit Review
                                </button>

                            </div>
                        </div>

                        <h3 className="reviewsHeading" > REVIEWS  </h3>                       
                            {                                
                                product && product.reviews[0] ? 
                                (
                                    <div className="reviews">
                                        {
                                            product.reviews && product.reviews.map( (review) => {
                                                return( <ReviewCard review={review} /> )
                                            } )
                                        }
                                    </div>
                                ) :
                                (
                                    <p className="noReviews">No Reviews Yet</p>
                                )                              
                            }
                        
                       
                    </>
                )
            }           
        </>
    )
}

export default ProductDetail