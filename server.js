<<<<<<< HEAD
var db = require('./Database');
const app = require('./Backend/app')
const port = process.env.PORT || 3000

db.connect(err => {
=======
const mysql = require("mysql");
const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const crypto = require("crypto");
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
var app = express();

app.use(bodyparser.json()); // to give Express the ability to read JSON payloads from the HTTP request body
app.use(cors());

const RSA_PRIVATE_KEY = "secret"; // People usually store it in a file and use fs library to open it (fs.readFyleSync('');)

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "web_project"
});

mysqlConnection.connect(err => {
>>>>>>> origin
  if (!err) {
    console.log("DB connection succeded.");
  } else {
    console.log(
      "DB connection failed \nError : " + JSON.stringify(err, undefined, 2)
    );
  }
});

<<<<<<< HEAD
app.listen(port, function (error) {
  if (error) {
    console.log("y'a un problème", error)
  } else {
    console.log("il n'y aucun problème, le port " + port + " écoute")
  }
=======
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
    // thanks to bodyParser.json(), we can call req.body
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
      res.redirect("http://localhost:4200/login");
    } else {
      console.log(err);
    }
  });
});

// LOGIN. Regarder comment faire app.route("/login").post(functionName)

app.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  mysqlConnection.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, row, fields) => {
      if (row.length > 0) {
        const iduser = row[0].id_user;
        // res.status(200).send({ message: email + " - " + password });
        const payload = { id_user: iduser };

        const token_jwtmethod = jwt.sign(payload, RSA_PRIVATE_KEY, {
          algorithm: "HS256",
          expiresIn: 30
        });

        console.log("token method : " + token_jwtmethod);

        res.status(200).json({ token: token_jwtmethod });
      } else {
        res.status(404).send(err);
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
>>>>>>> origin
});
