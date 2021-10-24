import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { auth } from "../firebase";
import firebase from "firebase/compat/app";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const signInwithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const googleLogout = () => {
    auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signInwithGoogle,
    googleLogout,
  };

  console.log(currentUser);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
