import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import store from "./store";
import { positions, transitions, Provider as AlertProvider, types } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.MIDDLE_RIGHT,
  transition: transitions.SCALE,
  type: types.ERROR,
};

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>,
  <Provider store={store} >
     <AlertProvider template={AlertTemplate} {...options}>
       <App />
     </AlertProvider>
  </Provider>,
  document.getElementById('root')
);

