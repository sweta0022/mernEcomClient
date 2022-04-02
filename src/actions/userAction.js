
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    CLEAR_ERRORS
    } from "./../constants/userConstant";

    import axios from "axios";

    //Login
export const login = ( loginEmail,loginPassword ) => async( dispatch ) => {
    try
    {
        dispatch({ type: LOGIN_REQUEST, });

        const config = { headers: { "Content-Type": "application/json" } };

        const response  = await axios.post(
          `/api/v1/signin`,
          { 
            email:  loginEmail, 
            password: loginPassword 
          },
          config
        );
        
        if(response.data.status === 200 )
        {
            dispatch({
                type: LOGIN_SUCCESS,
                payload:response.data
            });
        }
        else
        { 
            dispatch({
                type: LOGIN_FAIL,
                payload:response.data.message,
            });
        }
    }
    catch(error)
    {   
       
        dispatch({
            type: LOGIN_FAIL,
            payload: error.data.error.message,
        });
    }
}

//Register
export const updateProfile = ( userData ) => async( dispatch ) => {
    try
    {
        dispatch({ type: UPDATE_PROFILE_REQUEST, });

        const response = await fetch('/api/v1/user/updateProfile',{
            method: "PUT",
            body: userData
        });      
         
        const data = await response.json(response);
        console.log('REQUESTTTT');
        console.log(data);
        if(data.status === 200 )
        {
           
            dispatch({
                type: UPDATE_PROFILE_SUCCESS,
                payload:data.result
            });
        }
        else
        {
          
            dispatch({
                type: UPDATE_PROFILE_FAIL,
                payload:data.message,
            });
        }
    }
    catch(error)
    {
      
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response,
        });
    }
}

export const loadUser = () => async( dispatch ) => {
    try
    {
        dispatch({ type: LOAD_USER_REQUEST, });

        const response  = await axios.get(`/api/v1/getUserDetail`);
        console.log('LOAD_USER_REQUEST');
        console.log(response);
        
        if(response.data.status === 200 )
        {
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload:response.data
            });
        }
        else
        { 
            dispatch({
                type: LOAD_USER_FAIL,
                payload:response.data.message,
            });
        }
    }
    catch(error)
    {   
       
        dispatch({
            type: LOGIN_FAIL,
            payload: error.data.error.message,
        });
    }
}

export const logout = () => async ( dispatch ) => {
    try
    {
         await axios.get(`/api/v1/logout`);
       
        // console.log(response);
        dispatch({ type: LOGOUT_SUCCESS });
    }
    catch(error)
    {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.data.error.message,
        });
    }
}

//Register
export const register = ( userData ) => async( dispatch ) => {
    try
    {
        dispatch({ type: REGISTER_USER_REQUEST, });

        const response = await fetch('/api/v1/signup',{
            method: "POST",
            body: userData
        });      
         
        const data = await response.json(response);
       
        if(data.status === 200 )
        {
           
            dispatch({
                type: REGISTER_USER_SUCCESS,
                payload:data.result
            });
        }
        else
        {
          
            dispatch({
                type: REGISTER_USER_FAIL,
                payload:data.message,
            });
        }
    }
    catch(error)
    {
      
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response,
        });
    }
}

// Clearing Errors
export const clearErrors = async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS,
    });
}