const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
const session = require("express-session");
const cors = require("cors");

var app = express();

app.use(bodyparser.json());
app.use(cors());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "web_project"
});

mysqlConnection.connect(err => {
  if (!err) {
    console.log("DB connection succeded.");
  } else {
    console.log(
      "DB connection failed \nError : " + JSON.stringify(err, undefined, 2)
    );
  }
});

app.listen(3000, () => console.log("Express server is running at port 3000"));

app.get("/", (req, res) => {
  res.send("Hello server is running !");
});

// REGISTRATION
// Cet URL est lié à l'URL qu'on a cré dans user-registration.services.ts

app.post("/register", (req, res) => {
  res.status(200).send({ message: "Data received" });
  var INSERT_QUERY =
    "INSERT INTO users (nom,prenom,age,email,pseudo,password,nb_publications,nb_relations) VALUES (?,?,?,?,?,?,?,?)";
  var query = mysql.format(INSERT_QUERY, [
    req.body.nom,
    req.body.prenom,
    req.body.age,
    req.body.email,
    req.body.pseudo,
    req.body.password,
    0,
    0
  ]);

  mysqlConnection.query(query, (err, rows, fields) => {
    if (!err) {
      console.log(rows);
    } else {
      console.log(err);
    }
  });
});

// LOGIN

app.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  res.status(200).send({ message: email + " - " + password });

  mysqlConnection.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, row, fields) => {
      if (row.length > 0) {
        console.log(row);
      } else {
        console.log(err);
      }
    }
  );
});

// Get all users

app.get("/users", (req, res) => {
  mysqlConnection.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) {
      console.log(rows);
    } else {
      console.log(err);
    }
  });
});

// Get specific user

app.get("/users/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM users WHERE id_user = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

// Insert an user

app.post("/users", (req, res) => {});
