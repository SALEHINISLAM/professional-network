import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);
  // const [refetch] = useUserInfoFromMongodb();

  const axiosPublic = useAxiosPublic();

  const createUser = async (email, password, displayName) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const newUser = userCredential.user;
      await updateProfile(newUser, {
        displayName: displayName,
      });
      setUser(newUser);
      return userCredential.user;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          return userCredential.user;
        }
      );
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    const googleProviders = new GoogleAuthProvider();
    try {
      signInWithPopup(auth, googleProviders).then((userCredential) => {
        setUser(userCredential.user);
        return userCredential.user;
      });
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log("current user", currentUser);
      if (currentUser) {
        //refetch()
        const userInfo = { email: currentUser.email };
        axiosPublic
          .post("/jwt", userInfo)
          .then((res) => {
            console.log("jwt response", res.data);
            if (res.data.token) {
              localStorage.setItem("access-token", res.data.token);
            } else {
              localStorage.removeItem("access-token");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }else{
        localStorage.removeItem('access-token')
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    logOut,
    googleSignIn,
    signIn,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
