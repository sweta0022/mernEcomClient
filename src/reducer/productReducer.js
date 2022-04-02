import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAIL_REQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL,
    CLEAR_ERRORS
} from "./../constants/productConstants";

export const productReducer = ( state = { products:[] } , action ) => {
   
    switch (action.type)
    {
        case ALL_PRODUCT_REQUEST:
            return {
                loading:true,
                products:[],
            };

        case ALL_PRODUCT_SUCCESS:
            return {
                loading:false,
                products:action.payload.productList,
                productsCount: action.payload.allProductCount,
            };

        case ALL_PRODUCT_FAIL:
            return {
                loading:false,
                error:action.payload,
            };

        case CLEAR_ERRORS :
            return {
                ...state,
                error:null,
            };

        default:
            return state;
    }
} 

export const productDetailsReducer = ( state = { productDetail:{} } , action ) => {
    switch (action.type)
    {
        case PRODUCT_DETAIL_REQUEST:
            return {
                loading:true,
                ...state,
            };

        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading:false,
                product:action.payload.result,
            };

        case PRODUCT_DETAIL_FAIL:
            return {
                loading:false,
                error:action.payload,
            };

        case CLEAR_ERRORS :
            return {
                ...state,
                error:null,
            };

        default:
            return state;
    }
} 