const withAuth = require("../withAuth");

module.exports = (app, db) => {
  const ProspectModel = require("../models/ProspectModel")(db);

  //route d'ajout d'un prospect
  app.post("/api/v1/prospect/add", withAuth, async (req, res) => {
    let prospect = await ProspectModel.saveOneProspect(req);
    if (prospect.code) {
      res.json({ status: 503, message: "Erreur lors de l'ajout du prospect" });
    } else {
      res.json({ status: 200, message: "Prospect ajouté" });
    }
  });

  //route de récupération des prospect d'un utilisateur
  app.get("/api/v1/prospect/all/:user_id", withAuth, async (req, res) => {
    let prospect = await ProspectModel.getAllProspect(req.params.user_id);
    if (prospect.code) {
      res.json({
        status: 503,
        message: "Erreur lors de la récupération des prospects",
      });
    } else {
      res.json({
        status: 200,
        message: "Récupération des prospects",
        data: prospect,
      });
    }
  });

  //route de récupération d'un prospect
  app.get("/api/v1/prospect/one/:id", withAuth, async (req, res) => {
    let prospect = await ProspectModel.getOneProspect(req.params.id);
    if (prospect.code) {
      res.json({
        status: 503,
        message: "Erreur lors de la récupération du prospect",
      });
    } else {
      res.json({
        status: 200,
        message: "Récupération du prospect",
        data: prospect,
      });
    }
  });

  //route de modification d'un prospect
  app.put("/api/v1/prospect/update/:id", withAuth, async (req, res) => {
    let prospect = await ProspectModel.updateProspect(req, req.params.id);
    if (prospect.code) {
      res.json({
        status: 503,
        message: "Erreur lors de la modification du prospect",
      });
    } else {
      res.json({ status: 200, message: "Modification du prospect" });
    }
  });

  //route de suppression d'un prospect
  app.delete("/api/v1/prospect/delete/:id", withAuth, async (req, res) => {
    let prospect = await ProspectModel.deleteOneProspect(req.params.id);
    if (prospect.code) {
      res.json({
        status: 503,
        message: "Erreur lors de la suppression du prospect",
      });
    } else {
      res.json({ status: 200, message: "Suppression du prospect" });
    }
  });
};
