import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './Pages/Login';
import {firebaseAppProvaider, FirebaseAppProvider} from "reactfire";
import firebaseConfig from "./utils/firebaseConfig";
import EventosPage from './Pages/eventos';

import 'bootstrap/dist/css/bootstrap.mim.css';

ReactDOM.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>

    <EventosPage/>
    </FirebaseAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
