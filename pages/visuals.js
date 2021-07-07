import React,{useState, useEffect} from 'react'
import BarChart from "../components/Charts/BarChart";
import GridLayout from "react-grid-layout";
import KPI from '../components/Charts/KPI';
import HorizontalBarChart from '../components/Charts/HorizontalBarChart';
HorizontalBarChart

const Visual = () => {

  const layout = [
    { i: "a", x: 1, y: 0, w: 3, h: 4, minW: 4, minH: 4 },
    { i: "b", x: 1, y: 0, w: 3, h: 4, minW: 4, minH: 4 },
    { i: "c", x: 1, y: 0, w: 3, h: 5, minW: 4, minH: 4 },
    { i: "d", x: 5, y: 4, w: 7, h: 9, minW: 4, minH: 7 },
    { i: "e", x: 6, y: 12, w: 7, h: 9, minW: 4, minH: 7 },
  ];

    const [bookings, setBookings] = useState([])
    const [IsLoading, setisLoading] = useState(false)


  
    const boxStyle = {
      boxShadow: "0 4px 8px 0 darkgrey, 0 6px 20px 0 darkgrey",
      padding: "1rem",
    }

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
        <h1 style={{textAlign:"center"}}>Visuals of Tickets</h1>
        
  <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
        <div key="a" style={boxStyle}>
        <KPI bar_data={bookings.length > 0 ? bookings.map(e => {
          return e.payment
        }): 0} title="Payment"/>
        </div>
        <div key="b" style={boxStyle}>
        <KPI bar_data={bookings.length > 0 ? bookings.map(e => {
          return e.booking_id
        }): 0} title ="Total Tickets"/>
        </div>

        <div key="c" style={boxStyle}>
        <KPI bar_data={bookings.length > 0 ? bookings.map(e => {
          return e.destination_city
        }): 0} title ="Most Travel City"/>
        </div>


        <div key="d" style={boxStyle}>
          <BarChart bar_data={bookings.length > 0 ? bookings.map(e => {
          return e.travel_type
        }): 0 }/>
        </div>


        <div key="e" style={boxStyle}>
          <HorizontalBarChart bar_data={bookings.length > 0 ? bookings.map(e => {
          return e.destination_city
        }): 0 }/>
        </div>

      </GridLayout>
    </div>
  )
}

export default Visual;