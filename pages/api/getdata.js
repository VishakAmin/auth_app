const conn = require("../../utils/connection");

const getBooking =  async (req, res) => {

  if(req.method === 'POST'){
      
      const {email } = req.body
    
      const checkEmail = await conn.query(
        `SELECT email FROM public.booking WHERE email=$1`,
        [email]
      );

      if(checkEmail.rows.length > 0){

      const insertData = await conn.query(
        `SELECT * FROM public.booking WHERE email=$1`,
        [email]
      );
     
        return res.status(200).json({
          message: `Booking History retrivied Successfully`,
          data : insertData.rows,      })
    }
      return res.status(400).json({
      message: `No Booking History Found`,
    })
  }
  
}
export default getBooking;