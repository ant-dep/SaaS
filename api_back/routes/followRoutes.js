const withAuth = require("../withAuth");

module.exports = (app, db) => {
  const FollowModel = require("../models/FollowModel")(db);

  //route d'ajout d'un suivi
  app.post("/api/v1/follow/add", withAuth, async (req, res) => {
    let follow = await FollowModel.saveOneFollow(req);
    if (follow.code) {
      res.json({ status: 503, message: "Erreur lors de l'ajout du suivi" });
    } else {
      res.json({ status: 200, message: "Suivi ajouté" });
    }
  });

  //route de récupération de tous les suivis d'un utilisateur
  app.get("/api/v1/follow/all/:user_id", withAuth, async (req, res) => {
    let follow = await FollowModel.getAllFollow(req.params.user_id);
    if (follow.code) {
      res.json({
        status: 503,
        message: "Erreur lors de la récupération des suivis",
      });
    } else {
      res.json({ status: 200, message: "Suivis récupérés", data: follow });
    }
  });

  //route de récupération d'un suivi
  app.get("/api/v1/follow/one/:id", withAuth, async (req, res) => {
    let follow = await FollowModel.getOneFollow(req.params.id);
    if (follow.code) {
      res.json({
        status: 503,
        message: "Erreur lors de la récupération du suivi",
      });
    } else {
      res.json({ status: 200, message: "Suivi récupéré", data: follow });
    }
  });

  //route de modification d'un suivi
  app.put("/api/v1/follow/update/:id", withAuth, async (req, res) => {
    let follow = await FollowModel.updateFollow(req, req.params.id);
    if (follow.code) {
      res.json({
        status: 503,
        message: "Erreur lors de la modification du suivi",
      });
    } else {
      res.json({ status: 200, message: "Suivi modifié" });
    }
  });

  //route de suppression d'un suivi
  app.delete("/api/v1/follow/delete/:id", withAuth, async (req, res) => {
    let follow = await FollowModel.deleteOneFollow(req.params.id);
    if (follow.code) {
      res.json({
        status: 503,
        message: "Erreur lors de la suppression du suivi",
      });
    } else {
      res.json({ status: 200, message: "Suivi supprimé" });
    }
  });
};
