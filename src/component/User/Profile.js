import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./Profile.css";

const Profile = ({ history }) => {

   const { loading, isAuthenticated, loggedInUser  } = useSelector((state) => state.loggedInUser); 

   useEffect(()=>{
      if( isAuthenticated === false )
      {
       
         history.push('/login');
      }
   },[history,isAuthenticated])

   return(
    <>
       {loading?<Loader/>:
         <>
             <MetaData title={`${loggedInUser.name}'s Profile`} />
         <div className="profileContainer">
              <div>
                <h1>My Profile</h1>
                <img src={loggedInUser.profile_img.url} alt={loggedInUser.name} />
                <Link to="/account/update">Edit Profile</Link>
              </div>
              <div>
                <div>
                  <h4>Full Name</h4>
                  <p>{loggedInUser.name}</p>
                </div>
                <div>
                  <h4>Email</h4>
                  <p>{loggedInUser.email}</p>
                </div>
                <div>
                  <h4>Joined On</h4>
                  <p>{String(loggedInUser.created_at).substr(0, 10)}</p>
                </div>
  
                <div>
                  <Link to="/orders">My Orders</Link>
                  <Link to="/password/update">Change Password</Link>
                </div>
              </div>
         </div>
         </>
       }
    </>
   ) 
}

export default Profile;