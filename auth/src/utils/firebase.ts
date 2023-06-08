// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD14yG_Qz_WID9cl6FV4yfNOLnmu313SRs",
  authDomain: "auth-linkedin-726a2.firebaseapp.com",
  projectId: "auth-linkedin-726a2",
  storageBucket: "auth-linkedin-726a2.appspot.com",
  messagingSenderId: "1024843993004",
  appId: "1:1024843993004:web:8619ca70e8ef61e4e6f409",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth();

export {
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  auth,
  app,
};
