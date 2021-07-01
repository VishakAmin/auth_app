const conn = require("../../utils/connection");

const bookingHander =  async (req, res) => {

  if(req.method === 'POST'){

      const {boarding_city, destination_city, journey_date, flight,email } = req.body
      console.log("API is", email,boarding_city, destination_city,journey_date,flight);
     


      const checkEmail = await conn.query(
        `SELECT email FROM public.users WHERE email=$1`,
        [email]
      );

      if(checkEmail.rows.length > 0){

        console.log("Inside");
      const insertData = await conn.query(
        `INSERT INTO public.booking (email, boarding_city, destination_city,journey_date, flight) values ($1, $2, $3, $4, $5) RETURNING *`,
        [email, boarding_city, destination_city, journey_date, flight]
      );
     
        return res.status(200).json({
          message: ` Ticket ${boarding_city} to ${destination_city} Is booked Successfully`,
          data : insertData.rows
   
      })
    }
    }
      
    }
    // else{
    //   return res.status(400).json({
    //     message: "Booking Unsuccessful. Please Try Again"
    //   })
    // }


export default bookingHander;