import React from "react";
import "./UpdateProfile.css";
import Loader from "../layout/Loader/Loader";
// import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import Phone from "@material-ui/icons/Phone";
import Work from "@material-ui/icons/Work";
import FaceIcon from "@material-ui/icons/Face";
import { useEffect,  useState } from "react";
import {  clearErrors, loadUser, updateProfile } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { UPDATE_PROFILE_RESET } from "./../../constants/userConstant";
import MetaData from "../layout/MetaData";

const UpdateProfile = ({history}) => {
    const dispatch = useDispatch(); 
    const alert = useAlert();

    const { loggedInUser } = useSelector(  (state) => state.loggedInUser );

    const { error, isUpdated, loading } = useSelector(  (state) => state.profile );

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview ] = useState("/Profile.png");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [work, setWork] = useState("");

    const updateProfileDataChange = (e) => {
        if( e.target.name === "avatar" )
        {
           const reader = new FileReader();
           reader.onload = () => {
             if( reader.readyState === 2 ) // it has 3 state. 0 = initial , 1 = processing , 2 = Done
             {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
             }
           };

           reader.readAsDataURL(e.target.files[0]);
        }
    }
    const updateProfileSubmit = (e) => {
       
        e.preventDefault();
        const myForm = new FormData();  
        myForm.set("name",name);
        myForm.set("email",email);
        myForm.set("phone",phone);
        myForm.set("work",work);
        myForm.set("avatar",avatar);
   
        dispatch( updateProfile(myForm) );
      }
  
      useEffect( () => {
          if(loggedInUser)
          {
             setName(loggedInUser.name);
             setEmail(loggedInUser.email);
             setPhone(loggedInUser.phone);
             setWork(loggedInUser.work);
             setAvatarPreview(loggedInUser.profile_img.url);
          }

        if( error )
        {
          alert.error(error);
          dispatch(clearErrors);
        }
  
       if(isUpdated)
       {
            alert.success("Profile Updated Successfully");
            dispatch(loadUser());
            history.push('/account');
            dispatch({type: UPDATE_PROFILE_RESET,}); // isUpdated again set to false
       }
  
      },[dispatch,error,alert, loggedInUser, isUpdated, history] );

    return(
        <>
         {loading ? (
        <Loader />
      ) : (
        <>
           <MetaData title="Update Profile" />
            <div className="updateProfileContainer">
                <div className="updateProfileBox">
                <h2 className="updateProfileHeading">Update Profile</h2>

                <form
                    className="updateProfileForm"
                    encType="multipart/form-data"
                    onSubmit={updateProfileSubmit}
                >
                    <div className="updateProfileName">
                    <FaceIcon />
                    <input
                        type="text"
                        placeholder="Name"
                        required
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                    <div className="updateProfileEmail">
                    <MailOutlineIcon />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    </div>

                    <div className="signUpPassword">
                  <Phone />
                  <input
                    type="text"
                    placeholder="Phone"
                    required
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="signUpPassword">
                  <Work />
                  <input
                    type="text"
                    placeholder="Work"
                    required
                    name="work"
                    value={work}
                    onChange={(e) => setWork(e.target.value)}
                  />
                </div>

                    <div id="updateProfileImage">
                    <img src={avatarPreview} alt="Avatar Preview" />
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={updateProfileDataChange}
                    />
                    </div>
                    <input
                    type="submit"
                    value="Update"
                    className="updateProfileBtn"
                    />
                </form>
                </div>
            </div>
        </>
      )}
           
        </>
    )
}

export default UpdateProfile