
import "./LoginSignup.css";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Phone from "@material-ui/icons/Phone";
import Work from "@material-ui/icons/Work";
import FaceIcon from "@material-ui/icons/Face";
import { useEffect, useRef, useState } from "react";
import {  login, clearErrors, register } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";


const LoginSignUp = ({ history, location }) => {
    const dispatch = useDispatch(); 
    const alert = useAlert();

    const switcherTab = useRef(null);
    const registerTab = useRef(null);
    const loginTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const { loading, isAuthenticated , error } = useSelector( 
      (state) => state.loggedInUser
    );


    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(loginEmail, loginPassword));
    };


    const switchTabs = (e, tab) => {
        if( tab === "login" )
        {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }

        if( tab === "register" )
        {
            switcherTab.current.classList.add("shiftToRight");
            switcherTab.current.classList.remove("shiftToNeutral");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    }

    const [ registerData, setRegisterData ] = useState({
      name : "",
      email : "",
      password : "",
      phone : "",
      work : ""
    });

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview ] = useState("/Profile.png");

    const registerDataChange = (e) => {
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
        else
        {
           setRegisterData({ ...registerData, [e.target.name] : e.target.value});
        }
    }

    const registerSubmit = (e) => {
      e.preventDefault();
      const myForm = new FormData();

      myForm.set("name",registerData.name);
      myForm.set("email",registerData.email);
      myForm.set("phone",registerData.phone);
      myForm.set("work",registerData.work);
      myForm.set("password",registerData.password);
      myForm.set("avatar",avatar);
 
      dispatch( register(myForm) );
    }

    useEffect( () => {
      if( error )
      {
        alert.error(error);
        dispatch(clearErrors);
      }

      const redirect = (location.search)? location.search.split("=")[1] : '/account';

     if(isAuthenticated)
     {      
      history.push(redirect);
     }

    },[dispatch,error,alert,isAuthenticated, history] );

  return (
    <>
      { loading ? (
        <Loader />
      ) : (
        <>
          <div className="LoginSignUpContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={ (e) => switchTabs(e, "login") } >LOGIN</p>
                  <p onClick={ (e) => switchTabs(e, "register") }>REGISTER</p>                   
                </div >
                <button ref={switcherTab} ></button>
              </div>
              <form className="loginForm"  ref={loginTab}  onSubmit={loginSubmit} >
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forget Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={registerData.name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={registerData.email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={registerData.password}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signUpPassword">
                  <Phone />
                  <input
                    type="text"
                    placeholder="Phone"
                    required
                    name="phone"
                    value={registerData.phone}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <Work />
                  <input
                    type="text"
                    placeholder="Work"
                    required
                    name="work"
                    value={registerData.work}
                    onChange={registerDataChange}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginSignUp;
