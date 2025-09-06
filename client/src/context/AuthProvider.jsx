import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider=({children})=>{
     const [isLoggedIn, setIsLoggedIn] = useState(false)

     useEffect(()=>{
    const token = localStorage.getItem("user");
    if(token){
      setIsLoggedIn(true)
    } 
  },[]);

     return(
          <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
               {children}
          </AuthContext.Provider>
     )
}

export const useAuth = () => useContext(AuthContext)