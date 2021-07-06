import React,{useState, useContext, useEffect} from 'react';
import classes from './Booking.module.css'
import Select from 'react-select';
import AuthContext from '../../store/auth-context';

const Countries = [
  {
    label :"Andaman and Nicobar Islands"
},
{
    label :"Andhra Pradesh"
},
{
    label :"Arunachal Pradesh"
},
{
    label :"Assam"
},
{
    label :"Bihar"
},
{
    label :"Chandigarh"
},
{
    label :"Chhattisgarh"
},
{
    label :"Dadra and Nagar Haveli"
},
{
    label :"Daman and Diu"
},
{
    label :"Delhi"
},
{
    label :"Goa"
},
{
    label :"Gujarat"
},
{
    label :"Haryana"
},
{
    label :"Himachal Pradesh"
},
{
    label :"Jammu and Kashmir"
},
{
    label :"Jharkhand"
},
{
    label :"Karnataka"
},
{
    label :"Kerala"
},
{
    label :"Ladakh"
},
{
    label :"Lakshadweep"
},
{
    label :"Madhya Pradesh"
},
{
    label :"Maharashtra"
},
{
    label :"Manipur"
},
{
    label :"Meghalaya"
},
{
    label :"Mizoram"
},
{
    label :"Nagaland"
},
{
    label :"Odisha"
},
{
    label :"Puducherry"
},
{
    label :"Punjab"
},
{
    label :"Rajasthan"
},
{
    label :"Sikkim"
},
{
    label :"Tamil Nadu"
},
{
    label :"Telangana"
},
{
    label :"Tripura"
},
{
    label :"Uttar Pradesh"
},
{
    label :"Uttarakhand"
},
{
    label:"West Bengal"
}
];


const Flights = [  
  {label : "Flight A3070"},
  {label : "Flight A9070"},
  {label : "Flight A5070"},
  {label : "Flight A1060"},
  {label : "Flight A800"},
  {label : "Flight A3900"},
  {label : "Flight A3010"},
  {label : "Flight A3080"},

]


const Payments = [  
    {label : 500},
]

const Payments_Business = [  
    {label : 2000},
]
const Class = [  
    {label : "Economy"},
    {label : "Business"}
]

const Booking = () => {

  const authCtx = useContext(AuthContext)

  const [destinationCity, setDestinationCity] = useState(null)
  const [journeyDate, setJourneyDate] = useState(null)
  const [flight, setFlight] = useState(null)
  const [boardingCity, setBoardingCity] = useState(null)
  const [payment, setPayment] = useState(null)
  const [travelClass, setTravelClass] = useState(null)
  // const [email , setEmail] = useState(null)
  const [message, setMessage] = useState(null)

  

  var emailId = ""
  if(localStorage.getItem("accessToken") !== null ) {
    const storedInfo = localStorage.getItem("accessToken");
    const parseData = JSON.parse(storedInfo)
    emailId =  parseData.email
  }


  const data = { 
   boarding_city : boardingCity,
   destination_city: destinationCity,
   journey_date : journeyDate,
   flight: flight,
   email: emailId,
   travel_type : travelClass,
   payment : payment
 }



  const onSubmitHandler = async (e) => {
    e.preventDefault()
    console.log(data)
    const bookingData = await fetch("/api/book",{
      method : "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await bookingData.json();
    console.log(res)
    setMessage(res.message)
  }
  

  const handleInputChangeCity = (e) => {
    setBoardingCity(e.label)

  }
  const handleInputChangeDest = (e) => {
    setDestinationCity(e.label)

  }
  const handleInputChangeDate = (e) => {
    setJourneyDate(e.target.value)

  }
  const handleInputChangeFlight = (e) => {
    setFlight(e.label)
  }

  const handleInputChangePayment = (e) => {
        setPayment(e.label)      
  }
  const handleInputChangeClass = (e) => {
            setTravelClass(e.label)
}
  

  console.log(journeyDate);

  return (
      <div>
        <h4>Book your flights on go</h4>
        <h3>{message}</h3>
        <section className={classes.box}>
          
        <form onSubmit={onSubmitHandler}>
          <div className={classes.control}>
            <label>Select Boarding City</label>
            <label>Select Destination City</label>
          </div>
          
          <div className={classes.control}>
            <Select options={Countries} className={classes.select}  onChange={handleInputChangeCity}  isSearchable required/>
            <Select options={Countries} className={classes.select}  onChange={handleInputChangeDest} required/>      
          </div>

          <div className={classes.control}>
            <label>Select Journey Date</label>
            <label>Select Flights</label>
          </div>

          <div className={classes.control}>
            <input type="date" name="Boarding Date" min="2021-07-07"  onChange={handleInputChangeDate} required/>      
            <Select options={Flights}  onChange={handleInputChangeFlight} className={classes.select} required/>    
          </div>


          <div className={classes.control}>
            <label>Class/Traveller Type</label>
            <label>Payment($)</label>
          </div>


          <div className={classes.control}>
            <Select options={Class}  onChange={handleInputChangeClass} className={classes.select}/>    
            <Select options={travelClass === "Business" ?  Payments_Business : Payments}  onChange={handleInputChangePayment} className={classes.select}/>    
          </div>

          <button className={classes.btn} type="submit">Submit</button>
        </form>          
        </section>
      </div>
  )
}

export default Booking
