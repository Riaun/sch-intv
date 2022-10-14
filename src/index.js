import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebaseConfig from './fbconfig';


const root = ReactDOM.createRoot(document.getElementById('root'));
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export {auth, db}

