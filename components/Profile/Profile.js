import React from 'react'
import Booking from '../Booking/Booking'
import classes from './Profile.module.css'



const Profile = () => {
  return (
        <section className={classes.profile}>
            <Booking/>
        </section>
  )
}

export default Profile
