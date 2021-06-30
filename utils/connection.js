const {Pool} = require("pg");

const conn = new Pool({
  database : 'barry',
  user: "postgres",
  password: "password",
  host: "localhost",
  port: 5432
})

module.exports = conn;
