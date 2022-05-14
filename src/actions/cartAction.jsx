import {
    ADD_TO_CART,   
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
    CLEAR_ERRORS
} from "./../constants/cartConstant";


export const addItemsToCart = (id,quantity) => async (dispatch,getState) => {
    try
    {
       
        const response = await fetch(`/api/v1/getProductDetail/${id}`);
        const data = await response.json();
        // console.log(data.result);
        if( data.status === 200 )
        {  
            dispatch({
                type: ADD_TO_CART,
                payload: {
                  product: data.result._id,
                  name: data.result.name,
                  price: data.result.price,
                  image: data.result.images[0].url,
                  stock: data.result.Stock,
                  quantity,
                },
              });
        }
       
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    }
    catch( error )
    {
       
    }
}

export const removeItemsFromCart = (id) => async (dispatch,getState) => {
    try
    {
        dispatch({
            type: REMOVE_CART_ITEM,
            payload: id,
          });
          
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    }
    catch( error )
    {
       
    }

   
}

export const saveShippingInfo = (data) => async (dispatch) => {
    try
    {
        dispatch({
            type: SAVE_SHIPPING_INFO,
            payload: data,
          });
          
        localStorage.setItem("shippingInfo", JSON.stringify(data));
    }
    catch( error )
    {
       //
    }

}
