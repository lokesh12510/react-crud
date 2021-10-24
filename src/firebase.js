import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMdpZe0p4Xw1s8GF_fCs9Y9pmI8eBi4dM",
  authDomain: "react-crud-c112f.firebaseapp.com",
  projectId: "react-crud-c112f",
  storageBucket: "react-crud-c112f.appspot.com",
  messagingSenderId: "504665341840",
  appId: "1:504665341840:web:8a2fbccf84114e13dc3d15",
};

firebase.initializeApp(firebaseConfig);

export const fireDb = firebase.database().ref();
export const auth = firebase.auth();
