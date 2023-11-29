// src/firebaseConfig.ts
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyCIxCV3RgxSY_G6ZPk7YcqRP3W6KD5rW-g",
    authDomain: "excel-uploader-4fa9d.firebaseapp.com",
    projectId: "excel-uploader-4fa9d",
    storageBucket: "excel-uploader-4fa9d.appspot.com",
    messagingSenderId: "499732986587",
    appId: "1:499732986587:web:ba82284f8a344557ba6afe"
};

// Check if Firebase is not already initialized before initializing it
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Export Firestore for use in other files
export const firestore = firebase.firestore();
