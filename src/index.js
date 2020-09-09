import React from "react";
import ReactDOM from "react-dom";
import { App } from "./components/App.jsx";
import * as firebase from "firebase/app";
import firebaseKey from "~/../firebaseKey";

const firebaseConfig = firebaseKey;

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById("root"));
