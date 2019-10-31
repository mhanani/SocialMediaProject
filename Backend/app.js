const express = require('express');
const app = express();
var multer = require('multer')
var db = require('../Database');
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const fs = require('fs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('Images'));
app.use(cors());

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype]; // l'extension
    cb(null, name + "." + ext);
  }
});
// tout ce qui va  à la base de donnée
app.post('/image/commentaire', (req, res, next) => {
  var sql = 'INSERT INTO images (img_commentaire) VALUES (?) ';
  const values = req.body.commentaire;

  db.query(sql, values, function (err, result, fields) {
    if (err) throw err;
    res.json('ahahah');
  });
});

// tout ce que la base de donnée nous envoie
app.get('/personne', (req, res) => {
  db.query('SELECT * FROM personne;', (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  })
});

app.post('/Images', multer({storage: storage}).single("image"), (req, res, next) => {
  const valeurNet = JSON.parse(JSON.stringify(req.body)); // pour parser en json
  const id_user = 1;
  const name = req.file.originalname
    .toLowerCase()
    .split(" ")
    .join("-");
  const ext = '.' + MIME_TYPE_MAP[req.file.mimetype];
  const url = req.protocol + '://' + req.get("host");
  const imagePath = url + '/' + name + ext;

  //commentaire
  var sql = 'INSERT INTO post(post_titre, post_nom, post_description, post_ext, post_chemin, id_user) VALUES (?,?,?,?,?,?) ';
  Values = [valeurNet.titre, name, valeurNet.description, ext, imagePath, id_user]
  db.query(sql, Values, function (err, result, fields) {
    if (err) throw err;
    res.json(Values);
  });
});

app.get('/ImageRecuperer', (req, res) => {

  db.query('SELECT * FROM post ORDER BY id_post DESC;', (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  })
});


app.get("/ImagesProfile/:id", (req, res) => {
  db.query("SELECT * FROM post WHERE id_user = ?", req.params.id, (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/ModificationImage/:id", (req, res) => {
  db.query(
    " UPDATE post SET post_description = ?, post_titre = ? WHERE id_user = ? AND post_chemin = ?",
    [req.body.description, req.body.titre, req.params.id, req.body.chemin], (err, rows, fields) => {
      if (err) {
        console.log(err);
      }
    });
});
app.post("/SupressionImage/:id", (req, res) => {
  db.query("DELETE FROM post WHERE id_user = ? AND post_chemin = ?", [req.params.id, req.body.chemin], (err, rows, fields) => {
    if (!err) {
      const path = './Images/' + req.body.nom + req.body.ext;
      try {
        fs.unlinkSync(path)
        console.log('fichier' + path + 'supprimer');
      } catch (err) {
        console.error(err)
      }

    } else {
      console.log(err);

    }
  });
});


////////////////////////////////////////
// REGISTRATION
// Cet URL est lié à l'URL qu'on a cré dans user-registration.services.ts

app.post("/register", (req, res) => {
  res.status(200).send({message: "Data received"});
  var INSERT_QUERY =
    "INSERT INTO users (nom,prenom,age,email,pseudo,password,nb_publications,nb_relations) VALUES (?,?,?,?,?,?,?,?)";
  var query = db.format(INSERT_QUERY, [
    req.body.nom,
    req.body.prenom,
    req.body.age,
    req.body.email,
    req.body.pseudo,
    req.body.password,
    0,
    0
  ]);
  db.query(query, (err, rows, fields) => {
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
  res.status(200).send({message: email + " - " + password});

  db.query(
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
  db.query("SELECT * FROM users", (err, rows, fields) => {
    if (!err) {
      console.log(rows);
    } else {
      console.log(err);
    }
  });
});

// Get specific user

app.get("/users/:id", (req, res) => {
  db.query(
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

app.post("/users", (req, res) => {
});


module.exports = app;
