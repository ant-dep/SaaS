const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const cors = require("cors");
app.use(cors());

if (!process.env.HOST_DB) {
  var config = require("./config");
} else {
  var config = require("./config-exemple");
}

const mysql = require("promise-mysql");

//importation de nos routes
const authRoutes = require("./routes/authRoutes");
const comRoutes = require("./routes/comRoutes");
const followRoutes = require("./routes/followRoutes");
const prospectRoutes = require("./routes/prospectRoutes");
const rdvRoutes = require("./routes/rdvRoutes");
const userRoutes = require("./routes/userRoutes");

const host = process.env.HOST_DB || config.db.host;
const database = process.env.DATABASE_DB || config.db.database;
const user = process.env.USER_DB || config.db.user;
const password = process.env.PASSWORD_DB || config.db.password;
//const port = process.env.PORT || config.db.port;

mysql
  .createConnection({
    host: host,
    database: database,
    user: user,
    password: password,
    //port: port
  })
  .then((db) => {
    console.log("connecté bdd");
    setInterval(async function () {
      let res = await db.query("SELECT 1");
    }, 10000);

    app.get("/", (req, res, next) => {
      res.json({ msg: "api ok", status: 200 });
    });

    //on glisse nos routes ici
    authRoutes(app, db);
    comRoutes(app, db);
    followRoutes(app, db);
    prospectRoutes(app, db);
    rdvRoutes(app, db);
    userRoutes(app, db);
  });

const PORT = process.env.PORT || 9500;

app.listen(PORT, () => {
  console.log("listening port: " + PORT);
});
