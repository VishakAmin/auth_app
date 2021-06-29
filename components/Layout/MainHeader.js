import React from 'react'
import Link from "next/link"

import classes from './MainNavigation.module.css'

const MainNavigation = () => {
  return (
    <header className={classes.header}>
        <div className={classes.logo}>
            Auth App
        </div>

        <nav>
            <ul>
              <li>
                  Login
              </li>
              <li>
                  <button type="">Logout</button> 
              </li>

            </ul>
        </nav>
    </header>

  )
}

export default MainNavigation
