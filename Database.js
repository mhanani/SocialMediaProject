var mysql = require('mysql');
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "web_project"
});
module.exports = mysqlConnection;
