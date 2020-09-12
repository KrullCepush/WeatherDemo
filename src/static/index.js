import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import * as firebase from "firebase/app";

import App from "~/App.jsx";

import firebaseKey from "~/../firebaseKey";
import configureStore from "~/store/config";

// Initialize Firebase
firebase.initializeApp(firebaseKey);

ReactDOM.render(
  <ReduxProvider store={configureStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ReduxProvider>,
  document.getElementById("root")
);
