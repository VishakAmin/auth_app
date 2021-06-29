const {Pool} = require("pg");

const conn = new Pool({
  database : 'auth',
  user: "barry",
  password: "password",
  host: "localhost",
  port: 5432
})

module.exports = conn;
