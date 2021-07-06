import React,{useState, useEffect} from 'react'
import BarChart from "../components/Charts/BarChart"

const Visual = () => {

    const [bookings, setBookings] = useState([])
    const [IsLoading, setisLoading] = useState(false)



    var emailId = ""
    if(localStorage.getItem("accessToken") !== null ) {
      const storedInfo = localStorage.getItem("accessToken");
      const parseData = JSON.parse(storedInfo)
      emailId =  parseData.email
    }


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
    setBookings(res.data) 
    setisLoading(false)
  } 
  getbookingData()

  },[])

  console.log(bookings);
  return (
    <div>
        <h1>Visuals of Tickets</h1>
        <BarChart bar_data={bookings.length > 0 ? bookings.map(e => {
          return e.travel_type
        }): 0 }/>
    </div>
  )
}

export default Visual;