import  {useRouter } from "next/router"
import  { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});



export const AuthContextProvider = () => {

  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect (() => {
    const retriveData = localStorage.getItem("accesstoken")
    if(retriveData){
      //islogged is true 
      setIsLoggedIn(true)
    }
  },[])

  const logoutHandler = () => {
  setIsLoggedIn(true);
    localStorage.removeItem('accesstoken');
    router.replace("/login");  
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
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  }

  return (
    <AuthContext.Provider value={contextValue}>
          {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;


