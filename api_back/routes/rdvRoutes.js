const withAuth = require("../withAuth");

module.exports = (app, db) => {
  const RdvModel = require("../models/RdvModel")(db);

  //route d'ajout d'un rdv
  app.post("/api/v1/rdv/add", withAuth, async (req, res) => {
    let rdv = await RdvModel.saveOneRdv(req);
    if (rdv.code) {
      res.json({ status: 503, message: "Erreur lors de l'ajout du rdv" });
    } else {
      res.json({ status: 200, message: "Rdv ajouté avec succès" });
    }
  });

  //route de récupération des rdv d'un utilisateur
  app.get("/api/v1/rdv/all/user_id", withAuth, async (req, res) => {
    let rdv = await RdvModel.getAllRdv(req.params.user_id);
    if (rdv.code) {
      res.json({
        status: 503,
        message: "Erreur lors de la récupération des rdv",
      });
    } else {
      res.json({ status: 200, message: "Rdv récupéré avec succès", data: rdv });
    }
  });
  //route de récupération d'un rdv
  app.get("/api/v1/rdv/one/:_id", withAuth, async (req, res) => {
    let rdv = await RdvModel.getOneRdv(req.params._id);
    if (rdv.code) {
      res.json({
        status: 503,
        message: "Erreur lors de la récupération du rdv",
      });
    } else {
      res.json({ status: 200, message: "Rdv récupéré avec succès", data: rdv });
    }
  });
  //route de modification d'un rdv
  app.put("/api/v1/rdv/update/:_id", withAuth, async (req, res) => {
    let rdv = await RdvModel.updateRdv(req, req.params._id);
    if (rdv.code) {
      res.json({
        status: 503,
        message: "Erreur lors de la modification du rdv",
      });
    } else {
      res.json({ status: 200, message: "Rdv modifié avec succès" });
    }
  });

  //route de suppresion d'un rdv
  app.delete("/api/v1/rdv/delete/:_id", withAuth, async (req, res) => {
    let rdv = await RdvModel.deleteOneRdv(req.params._id);
    if (rdv.code) {
      res.json({
        status: 503,
        message: "Erreur lors de la suppression du rdv",
      });
    } else {
      res.json({ status: 200, message: "Rdv supprimé avec succès" });
    }
  });
};
