import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { productDetailsReducer, productReducer } from "./reducer/productReducer";
import { loggedInUserReducer, profileReducer } from "./reducer/userReducer";

const reducer = combineReducers({
    products: productReducer,
    productDetails:productDetailsReducer,
    loggedInUser:loggedInUserReducer,
    profile:profileReducer,
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;