const conn = require("../../utils/connection");
const crypto = require("crypto")

const loginhandler = async (req, res) => {
  
  if(req.method === 'POST'){
    const {email, password} = req.body;

    const checkData = await conn.query(
      `SELECT email FROM user WHERE email=$1`,
      [email]
    );

    if(checkData.rows.length > 0){

      const hashingPassword = crypto.createHash("md5").update(password).digest("hex");

      if (hashingPassword === checkData.rows[0].password){
          return res.status(200).json({
            message: `Login Succesful ${email}`,
            data : checkData.rows[0],
          })

      }
      else{
        return res.status(400).json({
          message: `Invalid Password.`,
      });
      }
    }
    else{
      return res.status(400).json({
        message: "No user found. Please signup",
      });

    }        
  }
}

export default loginhandler
