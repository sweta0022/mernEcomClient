import React from "react";
import { useSelector } from "react-redux";
import { Redirect,Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {

    const { loading, isAuthenticated, loggedInUser  } = useSelector((state) => state.loggedInUser); 
    return(
        <>
            {loading === false && (
                <Route 
                    {...rest}
                    render={(props) => {
                        if(isAuthenticated === false)
                        {
                            return <Redirect to="/login"/>
                        }

                        if(isAdmin === true && loggedInUser.role !== "Admin")
                        {
                            return <Redirect to="/account"/>
                        }

                        return <Component {...props} />

                    }} />
            )}
        </>
    )
}

export default ProtectedRoute