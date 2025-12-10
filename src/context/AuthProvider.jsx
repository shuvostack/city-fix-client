import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
// import axios from "axios";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // --- LOGOUT FUNCTION ---
  const logOut = () => {
    setLoading(true);
    localStorage.removeItem("cityfix-token");
    return signOut(auth);
  };

  // --- FETCH USER FROM BACKEND USING EMAIL ---
  const fetchDbUser = async (email) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${email}`
      );
      setDbUser(res.data);

      // Save JWT
      if (res.data?.token) {
        localStorage.setItem("cityfix-token", res.data.token);
      }
    } catch (error) {
      console.error("DB User Load Failed:", error);
    }
  };

  // --- AUTH STATE LISTENER ---
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        await fetchDbUser(currentUser.email);
      } else {
        setDbUser(null);
        localStorage.removeItem("cityfix-token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []); 

  const authInfo = {
    user,             
    dbUser,            
    role: dbUser?.role,
    premium: dbUser?.isPremium,
    blocked: dbUser?.isBlocked,
    loading,
    logOut,
  };

  return (
    <UserContext.Provider value={authInfo}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;
