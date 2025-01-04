import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../Firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [passErrors, setPassErrors] = useState({});

  // Helper function to update user profile
  const updateUserProfile = async (user, name, photo) => {
    try {
      await updateProfile(user, { displayName: name, photoURL: photo });
      setUser({ ...user, displayName: name, photoURL: photo });
    } catch (err) {
      // console.error("Error updating user profile:", err.message);
    }
  };

  const createUser = async (email, password, name, photo) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = result.user;
      await updateUserProfile(user, name, photo);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logInUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      setUser(user); // Ensure the user state is updated
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // If the user doesn't have a displayName or photoURL, update their profile
      if (!user.displayName || !user.photoURL) {
        const displayName = user.providerData[0]?.displayName || "Google User";
        const photoURL = user.providerData[0]?.photoURL || "";
        await updateUserProfile(user, displayName, photoURL);
      }

      setUser(user);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log("Current User", currentUser);

      if (currentUser?.email) {
        const user = {
          email: currentUser.email,
        };

        axios
          .post("https://edu-hub-bangla-server.vercel.app/jwt", user, { withCredentials: true })
          .then((res) => {
            // console.log("Logged in", res.data);
            setLoading(false);
          })
          .catch((error) => {
            // console.error(error.message);
          });
      } else {
        axios
          .post("https://edu-hub-bangla-server.vercel.app/logout", {}, { withCredentials: true })
          .then((res) => {
            
            // console.log("Logged Out", res.data);
            setLoading(false);
          })
          .catch((error) => {
            // console.error(error.message);
          });
      }
    });

    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    setUser,
    createUser,
    logInUser,
    logOut,
    googleSignIn,
    error,
    setError,
    loading,
    passErrors,
    setPassErrors,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
