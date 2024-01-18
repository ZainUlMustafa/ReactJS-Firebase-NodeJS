import firebase from 'firebase/app'
import 'firebase/firestore';
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'
import functions from "firebase/functions";

const firebaseConfig = {
    apiKey: "AIzaSyDN92LikrltIk6kFXglSsNY-DetRFMYM6k",
    authDomain: "iamzaboiler.firebaseapp.com",
    projectId: "iamzaboiler",
    storageBucket: "iamzaboiler.appspot.com",
    messagingSenderId: "696105820152",
    appId: "1:696105820152:web:7eb282fde38755faa6c00d",
    measurementId: "G-8C0D0WDVHM"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const cloudFunction = firebase.functions();


export { storage, cloudFunction, firebase as default };