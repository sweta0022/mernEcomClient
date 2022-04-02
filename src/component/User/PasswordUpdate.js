import React, { useState } from "react";
import "./UpdatePassword.css";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import axios from "axios";


const PasswordUpdate = ({history}) => {
    const alert = useAlert();
    
    const [loading, setLoading] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");   
    
    const updatePasswordSubmit = async (e) => {
        e.preventDefault();
        
        if( newPassword !== confirmPassword )
        {
          
           alert.error('New password and confirm password does not match'); return false;
        }
        else
        {

          try
          {
            const config = { headers: { "Content-Type": "application/json" } };
            const response  = await axios.put(
              `/api/v1/password/update`,
              { 
                oldPassword:  oldPassword, 
                newPassword: newPassword, 
                confirmPassword: confirmPassword
              },
              config
            );
           
           
  
            if(response.data.status === 200 )
            {
              setLoading(false);
               alert.success("Password Updated Successfully");
               history.push('/account');
            }
            else
            { 
              setLoading(false);
               alert.error(response.data.message);
            }
          }
          catch(error)
          {
            // console.log(error.response);
            // console.log(error.response.data.message);
            alert.error(error.response.data.message); 
          }         
         
        }
       
    }

    return (
        <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Change Password" />
          <div className="updatePasswordContainer">
            <div className="updatePasswordBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>

              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <VpnKeyIcon />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockIcon />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  value="Change"
                  className="updatePasswordBtn"
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
    )
}

export default PasswordUpdate