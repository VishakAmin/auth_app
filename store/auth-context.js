import  {useRouter } from "next/router"
import  React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  email: "",
  isLoggedIn: false,
  login: async (data) => {},
  logout: () => {},
});



export const AuthContextProvider = (props) => {

  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState("")

  
  

  useEffect (() => {
    const storedInfo = localStorage.getItem("accessToken");
    const parseData = JSON.parse(storedInfo)
    setEmail(parseData.email)
    if(storedInfo){
      //islogged is true      
      setIsLoggedIn(true)
    }
  },[])


  const logoutHandler = () => {
  setIsLoggedIn(false);
    localStorage.removeItem('accesstoken');
    router.replace("/");  
  }
  

  const loginHandler = async (data) => {
    const loginData = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (loginData.ok) setIsLoggedIn(true);

    return loginData;
  };

  const contextValue = {
    isLoggedIn : isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    email:email
  }

  return (
    <AuthContext.Provider value={contextValue}>
          {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;


