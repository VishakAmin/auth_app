import React,{useContext, useState} from 'react'
import Link from "next/link"

import classes from './MainNavigation.module.css'
import AuthContext from '../../store/auth-context';

const MainNavigation = () => {

  const { isLoggedIn, logout } = useContext(AuthContext);

  console.log(isLoggedIn)
  return (
    <header className={classes.header}>
        <div className={classes.logo}>
            Auth App
        </div>

        <nav>
            <ul>
              
                  {!isLoggedIn && (
                      <li>
                          <Link href="/">Sign Up</Link>
                      </li>
                  ) }
              


              {isLoggedIn && (
                      <li>
                          <Link href="/home">Book Ticket</Link>
                      </li>
                  ) }
                
                {isLoggedIn && (
                      <li>
                          <Link href="/getbook">History</Link>
                      </li>
                  ) }

              <li>
                  {isLoggedIn && <button onClick={logout}>Logout</button>} 
              </li>
              
                   
              
            </ul>
        </nav>
    </header>

  )
}

export default MainNavigation
