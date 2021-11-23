import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import Modal from "react-modal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import {store} from "./state/store/index"



Modal.setAppElement("#root");

ReactDOM.render(
       <Provider store={store}><App />   <ToastContainer /></Provider>,
  document.getElementById("root")
);
