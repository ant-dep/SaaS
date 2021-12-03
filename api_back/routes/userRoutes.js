const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
if (!process.env.HOST_DB) {
  var config = require("../config");
} else {
  var config = require("../config-exemple");
}

const mail = require("../lib/mailing");

// const withAuth = require('../withAuth');

/*mail(
    req.body.mail,
    "Sujet du mail",
    "Mon titre de mail",
    "Mon corps de mail"
)*/

module.exports = (app, db) => {
  const userModel = require("../models/UserModel")(db);

  //route d'ajout d'un utilisateur (avec envoi d'un mail de confirmation avec lien url vers notre route de validation en lui passant le key_id du nouveau user)
  app.post("/api/v1/user/add", async (req, res, next) => {
    let result = await userModel.saveOneUser(req);

    if (result.code) {
      res.json({ status: 500, err: result });
    }

    if (result.status === 501) {
      res.json(result);
    }

    mail(
      req.body.email,
      "validation de votre compte",
      "Bienvenue sur commersaas",
      '<a href="http://localhost:9500/api/v1/user/validate/' +
        result.key_id +
        '">Valider mon email<a/> !'
    );

    res.json({ status: 200, msg: "Utilisateur enregistré" });
  });
  //route de validation d'un utilisateur par son key_id
  app.get("/api/v1/user/validate/:key_id", async (req, res) => {
    let validate = await userModel.updateValidateUser(req.params.key_id);
    if (validate.code) {
      res.json({
        status: 500,
        message: "Erreur lors de la validation de l'utilisateur",
      });
    } else {
      res.json({ status: 200, message: "Utilisateur validé" });
    }
  });
  //route récupération de mot de passe oublié (envoi un mail de changement de mot de passe)
  app.get("/api/v1/user/forgot", async (req, res) => {
    let user = await userModel.updateKeyId(req.body.email);
    if (user.code) {
      res.json({
        status: 500,
        message: "Erreur lors de la récupération de l'utilisateur",
      });
    }
    let key_id = user.key_id;
    mail(
      req.body.email,
      "Changement de mot de passe",
      '<a href="http://localhost:9500/api/v1/user/reset/' +
        key_id +
        '">Changer mon mot de passe<a/> !'
    );
    res.json({ status: 200, message: "Mail envoyé" });
  });

  //get route de changement de password par rapport à son key_id (res.render de la template ejs)
  app.get("/api/v1/user/reset/:key_id", async (req, res) => {
    res.render("forgot", { key_id: req.params.key_id, error: null });
  });

  //post route de changement de password par rapport à son key_id
  app.post("/api/v1/user/changePassword/:key_id", async (req, res, next) => {
    let key_id = req.params.key_id;
    let error = null;

    if (req.body.password1 !== req.body.password2) {
      error = "Vos deux mots de passe ne sont pas identique !";
    } else {
      let result = await userModel.updatepassword(req.body.password1, key_id);
      if (result.code) {
        error = "le mot de passe ne s'est pas modifié !";
      } else {
        error = "le mot de passe bien modifié !";
      }
    }
    res.render("forgot", { key_id: key_id, error: error });
  });

  //route de login
  app.post("/api/v1/user/login", async (req, res, next) => {
    let user = await userModel.getUserByMail(req.body.email);

    if (user.length === 0) {
      res.json({ status: 404, msg: "email inexistant dans la base de donnée" });
    } else {
      //si l'utilisateur n'a pas validé son compte via email
      if (user[0].validate === "no") {
        //on envoi une erreur vers le front pour le forcer à aller valider (accés login bloqué tant qu'il n'aura pas validé)
        res.json({ status: 403, msg: "Votre compte n'est pas validé" });
      }

      let same = await bcrypt.compare(req.body.password, user[0].password);
      if (same) {
        let infos = { id: user[0].id, email: user[0].email };
        let token = jwt.sign(infos, secret);

        res.json({ status: 200, msg: "connecté", token: token, user: user[0] });
      } else {
        res.json({ status: 401, msg: "mauvais mot de passe" });
      }
    }
  });
};
