import React,{useEffect, useState,useContext} from 'react'
import AuthContext from '../../store/auth-context';

import classes from "./GetBooking.module.css"

const GetBooking = () => {

  const [bookings, setBookings] = useState([])
  const authCtx = useContext(AuthContext)
  const [IsLoading, setisLoading] = useState(false)
  const email = {
    email : authCtx.email
  }

  useEffect(() => { 
    async function getbookingData(){

    setisLoading(true)
    const getData = fetch('/api/getdata',{ 
    method :"POST",
    headers: {
      "Content-Type":"application/json",
    },
      body:JSON.stringify(email)
    }
    );
    const res = await getData
    .then(res => res.json()) 

    setBookings(res.data) 
    setisLoading(false)

  } 
  getbookingData()
  },[bookings,email])



  return (

    <div>
        <h4>Booking History</h4>
         {bookings.map((book) =>{
            <section>
            <div>
             <p>Booking Date : {book.booking_id}</p>
             <p>From </p>
             <p>Destination</p>
             <p>Journey Date</p>
             <p>Flight Number</p>
         </div>
         </section>
        })}
    </div>
  )
}

export default GetBooking
