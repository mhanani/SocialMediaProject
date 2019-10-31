var db = require('./Database');
const app = require('./Backend/app')
const port = process.env.PORT || 3000

db.connect(err => {
  if (!err) {
    console.log("DB connection succeded.");
  } else {
    console.log(
      "DB connection failed \nError : " + JSON.stringify(err, undefined, 2)
    );
  }
});

app.listen(port, function (error) {
  if (error) {
    console.log("y'a un problème", error)
  } else {
    console.log("il n'y aucun problème, le port " + port + " écoute")
  }
});
