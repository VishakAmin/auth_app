const conn = require("../../utils/connection");
const crypto = require("crypto")

const signuphandler = async (req, res) => {
  
  if(req.method === 'POST'){
    const {email, password} = req.body;

    const checkEmail = await conn.query(
      `SELECT email FROM public.user WHERE email=$1`,
      [email]
    );

    if(checkEmail.rows.length === 0){
      const hashingPassword = crypto.createHash("md5").update(password).digest("hex");;

      const insertData = await conn.query(
        `INSERT INTO public.user (email, password) values ($1, $2) RETURNING *`,
        [email, hashingPassword]
      );
      return res.status(200).json({
        message: `${email} successfuly signed up. Please Login to continue`,
        data : insertData.rows,
      })
    }
      else{
          return res.status(400).json({
            message: "User Already Exist. Please Login with password."
          })
      }     
  }
}

export default signuphandler;
