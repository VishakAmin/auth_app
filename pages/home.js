import Profile from "../components/Profile/Profile"
import React, { useContext, useState } from "react";
import AuthContext from "../store/auth-context";
import Form from "../components/Form/Form";


const Home = () => {
  const authCtx = useContext(AuthContext);

  return (
    <div>
        {authCtx.isLoggedIn && <Profile/>}

    </div>
  )
}

export default Home
