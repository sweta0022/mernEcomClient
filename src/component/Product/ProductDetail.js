import './ProductDetail.css';
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from 'react-alert';
import { useEffect, useState } from 'react';
import { getProductDetails } from "./../../actions/productActions";
import Loader from "./../layout/Loader/Loader";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";
import { addItemsToCart } from "../../actions/cartAction";

const ProductDetail = ({match}) => {
    const dispatch = useDispatch();
    const alertbox = useAlert();
    const [quantity, setQuantity] = useState(1);
    
    const { loading,error,product } = useSelector( (state) =>state.productDetails );

    // Spread Operator
    // used for concatenation in array
    // const fullname = ['vinod','thapa']; // vinod,thapa
    // const biodata = [1,...fullname,26,'male'];//1,vinod,thapa,26,male
    //destructuring of an array
    // const shootergame = ['a','b','c','d'];
    // const [first,...remaining] = shootergame;
    // console.log(first); // a
    // console.log(remaining); // b,c,d
    //add to object or use another object in a object
    // const fullname = {'name':'vinod','lastname':'thapa'}; 
    // const biodata = { 'id':'1','age':'27',...fullname };

    useEffect( () => {  
    
        if(error)
        {
            alertbox.error(error);
        }
        dispatch( getProductDetails(match.params.id) );
      
    },[dispatch,error, match.params.id] )

    const options = {
        edit: false,
        color: "Grey",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25,
        value: product && product.rating,
        isHalf: true,
    }

    const decreaseQuantity = () => {
        if(quantity <= 1) return;
        const qty = quantity - 1;
        setQuantity(qty);
    }

    const increaseQuantity = () => {
        if(product.Stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    }

    const addToCartHandler = () => {
        dispatch( addItemsToCart( match.params.id , quantity ) );
        alertbox.success("Item added to cart");
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
                                            src={item.url}
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
                                            <button onClick={decreaseQuantity}>-</button>
                                            <input type="number" value={quantity} />
                                            <button onClick={increaseQuantity}>+</button>
                                        </div>
                                        <button
                                         disabled={product && product.Stock < 1 ? true : false}
                                         onClick={addToCartHandler}
                                        >
                                            Add to Cart
                                        </button>
                                    </div>

                                    <p>
                                    Status:
                                        <b className={product && product.Stock < 1 ? "redColor" : "greenColor"}>
                                        {product && product.Stock < 1 ? "Out Of Stock" : "In Stock"}
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