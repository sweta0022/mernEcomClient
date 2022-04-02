import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    CLEAR_ERRORS
} from "./../constants/productConstants";


export const getAllProducts = () => async (dispatch) => {
    try
    {
        dispatch({
            type: ALL_PRODUCT_REQUEST
        });

        const response = await fetch('/api/v1/getAllProducts');
        const data = await response.json();
         if( data.status === 200 )
         {
            dispatch({
                type: ALL_PRODUCT_SUCCESS,
                payload: data,
            });
         }
         else
         {
            dispatch({
                type: ALL_PRODUCT_FAIL,
                payload:  data.message,
            });
         }
        
    }
    catch( error )
    {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.response,
        });
    }
}
// product details
export const getProductDetails = (id) => async (dispatch) => {
    try
    {  
        dispatch({
            type:PRODUCT_DETAIL_REQUEST
        });

        const response = await fetch(`/api/v1/getProductDetail/${id}`);
        const data = await response.json();
      
        if( data.status === 200 )
         {
            dispatch({
                type: PRODUCT_DETAIL_SUCCESS,
                payload: data,
            });
         }
         else
         {   
            dispatch({
                type: PRODUCT_DETAIL_FAIL,
                payload:  data.message,
            });
         }
    }
    catch( error )
    {  
        dispatch({
            type: PRODUCT_DETAIL_FAIL,
            payload: error
        });
    }
}

// Clearing Errors
export const clearErrors = async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
}