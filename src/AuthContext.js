import React, {useEffect, useState,useContext} from "react";
import { auth } from './config/fire'

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser,setCurrentUser] = useState()
    const value = {currentUser}
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          setCurrentUser(user);
          setLoading(false)
        });
    
        return unsubscribe;
      }, []);

    return (
        <AuthContext.Provider value={value}>
          {!loading && children}
        </AuthContext.Provider>
      )
}

