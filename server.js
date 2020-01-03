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
var multer = require("multer");
const session = require("express-session");

app.use(bodyparser.json()); // to give Express the ability to read JSON payloads from the HTTP request body
app.use(cors());
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static("Images"));

const RSA_PRIVATE_KEY = "secret"; // People usually store it in a file and use fs library to open it (fs.readFyleSync('');)

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "admin",
  password: "admin",
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
////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// AMAR
////////////////////////////////////////////////////////////////////////////////////////

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

app.post("/image/commentaire", (req, res, next) => {
  var sql = "INSERT INTO images (img_commentaire) VALUES (?) ";
  const values = req.body.commentaire;

  mysqlConnection.query(sql, values, function (err, result, fields) {
    if (err) throw err;
    res.json("ahahah");
  });
});

app.post(
  "/Images/:id",
  multer({storage: storage}).single("image"),
  (req, res, next) => {
    const valeurNet = JSON.parse(JSON.stringify(req.body)); // pour parser en json
    const id_user = req.params.id;
    const name = req.file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = "." + MIME_TYPE_MAP[req.file.mimetype];
    const url = req.protocol + "://" + req.get("host");
    const imagePath = url + "/" + name + ext;
    console.log(valeurNet.location);
    var sql =
      "INSERT INTO post(post_titre, post_nom, post_description, post_ext, post_chemin, id_user, post_location) VALUES (?,?,?,?,?,?,?) ";
    Values = [
      valeurNet.titre,
      name,
      valeurNet.description,
      ext,
      imagePath,
      id_user,
      valeurNet.location
    ];

    mysqlConnection.query(sql, Values, (err, result, fields) => {
      mysqlConnection.query(
        "SELECT id_post FROM post WHERE post_chemin = ? AND id_user = ?",
        [imagePath, req.params.id],
        (err, result, fields) => {
          Values.push(result[0]);
          mysqlConnection.query(
            "UPDATE users SET nb_publications = nb_publications + 1 WHERE id_user = ?",
            req.params.id,
            (err, result, fields) => {
              mysqlConnection.query(
                "SELECT url_photo FROM users WHERE id_user = ?",
                req.params.id,
                (err, result, fields) => {
                  Values.push(result[0]);
                  res.json(Values);
                }
              );
              if (err) throw err;
            }
          );
        }
      );
      if (err) throw err;
    });
  }
);

app.post(
  "/Images-Profile/:id",
  multer({storage: storage}).single("image"),
  (req, res, next) => {
    const name = req.file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = "." + MIME_TYPE_MAP[req.file.mimetype];
    const url = req.protocol + "://" + req.get("host");
    const imagePath = url + "/" + name + ext;
    mysqlConnection.query(
      "UPDATE  users SET url_photo = ? WHERE id_user = ? ",
      [imagePath, req.params.id],
      (err, result, fields) => {
        if (err) throw err;
      }
    );
    res.json();
  }
);

app.get("/ImageRecuperer", (req, res) => {
  //FROM post p JOIN users u ON u.id_user = p.id_user ORDER BY id_post DESC
  mysqlConnection.query(
    "SELECT * FROM post ORDER BY id_post DESC;",
    (err, rows, fields) => {
      if (!err) {
        var Tableau = [];
        for (let row of rows) {
          mysqlConnection.query(
            "SELECT url_photo FROM users WHERE id_user = ? ",
            row.id_user,
            (err, result, fields) => {
              const post = {
                id_post: row.id_post,
                created_date: row.created_date,
                post_description: row.post_description,
                id_user: row.id_user,
                post_titre: row.post_titre,
                post_nom: row.post_nom,
                post_chemin: row.post_chemin,
                post_ext: row.post_ext,
                url_photo_user: result[0].url_photo,
                post_location: row.post_location
              };
              Tableau.push(post);

              if (rows.length - 1 === rows.indexOf(row)) {
                res.send(Tableau);
              }
            }
          );
        }
      } else {
        console.log(err);
      }
    }
  );
});
app.get("/ImagesProfile/:id", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM post WHERE id_user = ? ORDER BY id_post DESC",
    req.params.id,
    (err, rows, fields) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/ModificationImage/:id", (req, res) => {
  mysqlConnection.query(
    " UPDATE post SET post_description = ?, post_titre = ? WHERE id_user = ? AND post_chemin = ?",
    [req.body.description, req.body.titre, req.params.id, req.body.chemin],
    (err, rows, fields) => {
      if (!err) {
        res.json("");
      }
    }
  );
});
app.post("/SupressionImage/:id", (req, res) => {
  mysqlConnection.query(
    "DELETE FROM post WHERE id_user = ? AND post_chemin = ?",
    [req.params.id, req.body.chemin],
    (err, rows, fields) => {
      if (!err) {
        const path = "./Images/" + req.body.nom + req.body.ext;
        try {
          fs.unlinkSync(path);
          console.log("fichier" + path + "supprimer");
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log(err);
      }
    }
  );
  mysqlConnection.query(
    "UPDATE users SET nb_publications = nb_publications - 1 WHERE id_user = ?",
    req.params.id,
    (err, result, fields) => {
      if (err) throw err;
    }
  );
  res.json();
});

/////////////// Rate ////////////////

app.post("/EnvoieRate/:id/postID/:id_post", (req, res) => {
  mysqlConnection.query(
    "SELECT rate_given FROM postrate WHERE id_user = ? AND id_post = ?",
    [req.params.id, req.params.id_post],
    (err, rows, fields) => {
      if (rows.length === 0) {
        mysqlConnection.query(
          "INSERT INTO postrate(rate_given, id_user, id_post) VALUES (?,?,?)",
          [req.body.valeur, req.params.id, req.params.id_post]
        );
        res.json("insertion");
      } else {
        mysqlConnection.query(
          "UPDATE postrate SET rate_given = ? WHERE id_user = ? AND id_post = ?",
          [req.body.valeur, req.params.id, req.params.id_post]
        );
        res.json("modification");
      }
    }
  );
});

app.get("/GetRate/:id/postID/:id_post", (req, res) => {
  mysqlConnection.query(
    "SELECT rate_given FROM postrate WHERE id_user = ? AND id_post = ?",
    [req.params.id, req.params.id_post],
    (err, responseSQL, fields) => {
      if (!err) {
        PointRate = responseSQL[0];
        mysqlConnection.query(
          "SELECT SUM(rate_given) AS Somme  FROM postrate WHERE id_post = ?",
          [req.params.id_post],
          (err, responseSQL, fields) => {
            if (!err) {
              ScoreTotalRate = responseSQL[0];
              mysqlConnection.query(
                "SELECT rate_given FROM postrate WHERE id_post = ?",
                [req.params.id_post],
                (err, responseSQL, fields) => {
                  if (!err) {
                    TotalRate = responseSQL.length;
                    res.json([PointRate, TotalRate, ScoreTotalRate]);
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});

///////////////////////////////////////////////////////////////////////////////
//////////////////////// Commentaires
////////////////////////////////////////////////////////////////////////////

app.post("/EnvoieCommentaire/id_user/:id_user/postID/:id_post", (req, res) => {
  var TableauDonnee = [];
  mysqlConnection.query(
    "INSERT INTO commentaire(id_user, commentaire, id_post) VALUES (?,?,?)",
    [req.params.id_user, req.body.contenu, req.params.id_post],
    (err, rows, fields) => {
      TableauDonnee.push(req.body.contenu);
      mysqlConnection.query(
        "SELECT url_photo, pseudo FROM users WHERE id_user = ?",
        [req.params.id_user],
        (err, responseSQL, fields) => {
          if (!err) {
            TableauDonnee.push(responseSQL[0].url_photo, responseSQL[0].pseudo);
            res.json(TableauDonnee);
          }
        }
      );
    }
  );
});

//FROM post p JOIN users u ON u.id_user = p.id_user ORDER BY id_post DESC
app.get("/GetCommentaire/postID/:id_post", (req, res) => {
  mysqlConnection.query(
    "SELECT * FROM commentaire JOIN users ON commentaire.id_user = users.id_user WHERE commentaire.id_post = ? ORDER BY id_post DESC",
    [req.params.id_post],
    (err, responseSQL, fields) => {
      if (!err) {
        res.send(responseSQL);
      }
    }
  );
});

//////////////

////////////////////////////////////////////////////////////////////////////////////////
//////////////////////// AMAR
////////////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.send("Hello server is running !");
});

// REGISTRATION
// Cet URL est lié à l'URL qu'on a cré dans user-registration.services.ts

app.post("/register", (req, res) => {
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
      res.status(200).send(rows);
    } else {
      console.log(err);
    }
  });
});
/////////////////////////////////////////////////message
app.get("/PseudoGather", (req, res) => {
  mysqlConnection.query(
    "SELECT pseudo FROM users",
    (err, responseSQL, fields) => {
      if (!err) {
        res.send(responseSQL);
      }
    }
  );
});
app.get(
  "/GatherMessager/id_user_one/:id_envoyant/pseudo_user_two/:pseudo_recevant",
  (req, res) => {
    mysqlConnection.query(
      "SELECT id_user FROM users WHERE pseudo= ?",
      [req.params.pseudo_recevant],
      (err, responseSQL, fields) => {
        mysqlConnection.query(
          "SELECT content_message,pseudo FROM message JOIN users ON message.id_envoyant = users.id_user WHERE id_envoyant = ? AND id_recevant = ? OR id_envoyant = ? AND id_recevant = ? ",
          [
            req.params.id_one,
            responseSQL[0].id_user,
            responseSQL[0].id_user,
            req.params.id_one
          ],
          (err, resSQL, fields) => {
            console.log(resSQL);
            res.json(resSQL);
          }
        );
      }
    );
  }
);
app.post(
  "/EnvoieMessage/id_user_one/:id_one/pseudo_user_two/:pseudo_two",
  (req, res) => {
    mysqlConnection.query(
      "SELECT id_user FROM users WHERE pseudo= ?",
      [req.params.pseudo_two],
      (err, responseSQL, fields) => {
        mysqlConnection.query(
          "INSERT INTO message(content_message, id_envoyant, id_recevant) VALUES (?,?,?)",
          [req.body.content, req.params.id_one, responseSQL[0].id_user],
          (err, responseSQL, fields) => {
            if (!err) {
              console.log("message ajouté avec succès");
            }
          }
        );
      }
    );
  }
);

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
        const pseudo = row[0].pseudo;
        const url_photo = row[0].url_photo;
        // res.status(200).send({ message: email + " - " + password });
        const payload = {
          id_user: iduser,
          pseudo: pseudo,
          url_photo: url_photo
        };

        const token_jwtmethod = jwt.sign(payload, RSA_PRIVATE_KEY, {
          algorithm: "HS256",
          expiresIn: 30
        });
        res.status(200).json({token: token_jwtmethod, email: email});
      } else {
        res.status(404).send(err);
      }
    }
  );
});

// Get user-profile

app.get("/user-profile/:id", (req, res) => {
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

app.post("/user-profile/:id/UpdatePseudo", (req, res) => {
  console.log(req.body);
  var pseudo = req.body.pseudo;
  var id = req.params.id;
  console.log(pseudo + "-" + id);
  mysqlConnection.query(
    "UPDATE users SET pseudo = ? WHERE id_user = ?",
    [pseudo, id],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/user-profile/:id/UpdateEmail", (req, res) => {
  console.log(req.body);
  var email = req.body.email;
  var id = req.params.id;
  console.log(email + "-" + id);
  mysqlConnection.query(
    "UPDATE users SET email = ? WHERE id_user = ?",
    [email, id],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});

app.post("/user-profile/:id/UpdatePassword", (req, res) => {
  var password = req.body.password;
  var id = req.params.id;
  mysqlConnection.query(
    "UPDATE users SET password = ? WHERE id_user = ?",
    [password, id],
    (err, rows) => {
      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    }
  );
});
