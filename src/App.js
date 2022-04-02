
import "./App.css";
import Header from "./component/layout/Header.js";
import UserOption from "./component/layout/UserOption.js";
import Footer from "./component/layout/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetail from "./component/Product/ProductDetail";
import Profile from "./component/User/Profile.js";
import LoginSignup from "./component/User/LoginSignup"; 
import UpdateProfile from "./component/User/UpdateProfile.js";
import PasswordUpdate from "./component/User/PasswordUpdate.js";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import Dashboard from "./component/Admin/Dashboard.js";
import AllProduct from "./component/Admin/AllProduct.js";
import CreateProduct from "./component/Admin/CreateProduct.js";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect } from "react";
import { loadUser } from "./actions/userAction";
import store from "./store";
import { useSelector } from "react-redux";

function App() {

  const {  isAuthenticated , loggedInUser } = useSelector( 
    (state) => state.loggedInUser
  );

  useEffect(()=>{
    store.dispatch(loadUser());
  },[])

  return (
    <Router> 
      <Header/> 
          {isAuthenticated && <UserOption loggedInUser={loggedInUser} />}
         <Route exact path="/" component={Home} />
         <ProtectedRoute exact path="/account" component={Profile} />
         <ProtectedRoute exact path="/account/update" component={UpdateProfile} />
         <ProtectedRoute exact path="/password/update" component={PasswordUpdate} />
         <ProtectedRoute isAdmin={true} exact path="/admin/dashboard" component={Dashboard} />
         <ProtectedRoute isAdmin={true} exact path="/admin/all-products" component={AllProduct} />
         <ProtectedRoute isAdmin={true} exact path="/admin/product/create" component={CreateProduct} />
         <Route exact path="/product/:id" component={ProductDetail} />
         <Route exact path="/login" component={LoginSignup} />
         
         
      <Footer/>
    </Router>
    
  );
}

export default App;
