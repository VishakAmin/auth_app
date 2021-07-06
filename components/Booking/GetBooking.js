import React,{useEffect, useState,useContext} from 'react'
import AuthContext from '../../store/auth-context';
import moment from 'moment';
import classes from "./GetBooking.module.css"


const GetBooking = () => {

  const [bookings, setBookings] = useState([])
  const authCtx = useContext(AuthContext)
  const [IsLoading, setisLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [email, setEmail] = useState("")



  var emailId = ""
  if(localStorage.getItem("accessToken") !== null ) {
    const storedInfo = localStorage.getItem("accessToken");
    const parseData = JSON.parse(storedInfo)
    emailId =  parseData.email
  }

  console.log(emailId)

  const data = {
    email : emailId
  }

  useEffect(() => { 
    setisLoading(true)
    async function getbookingData(){

    const getData = fetch('/api/getdata',{ 
    method :"POST",
    headers: {
      "Content-Type":"application/json",
    },
      body:JSON.stringify(data)
    }
    );
    const res = await getData
    .then(res => res.json()) 
    setMessage(res.message)
    setBookings(res.data) 
    setisLoading(false)
  } 
  getbookingData()

  },[])


  console.log("isloading", bookings )


  if(message === "No Booking History Found") 
      {  
        return  <p> No Booking History</p>
      }

  return (
    <div>

      {IsLoading && <p> Loading ......</p>}
      
      
      {!IsLoading && bookings === undefined  && <p> No History ......</p>}

    {!IsLoading &&
      <div>   
        {bookings.length > 0 ? bookings.map((list) =>
     
     <section  key={list.booking_id} className={classes.card}> 
     <div> 
        <p><strong>Booking Date</strong>: {moment(list.created_at).format("MMM Do YYYY")}</p>
        <div className={classes.para}>
          <p><strong> Boarding City </strong>:  {list.boarding_city}</p>
          <p><strong>Destination City</strong> :  {list.destination_city}</p>
        </div>
        <div className={classes.para}>
          <p><strong>Journey Date</strong>:  {list.journey_date}</p>
          <p><strong>Flight Number</strong> : {list.flight} </p>
        </div>
        <div className={classes.para}>
          <p><strong>Travel Type</strong>:  {list.travel_type}</p>
          <p><strong>Payment</strong> : ${list.payment} </p>
        </div>
      </div>
      </section>

       ) : "No Data Found" }
  </div>
  }
  </div>

  )
}

export default GetBooking
