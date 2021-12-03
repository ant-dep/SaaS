const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const withAuth = require("../withAuth");

module.exports = (app, db) => {
  const userModel = require("../models/UserModel")(db);

  app.get("/api/v1/checkToken", withAuth, async (req, res, next) => {
    //console.log(req)
    let user = await userModel.getUserByMail(req.email);
    console.log(user);
    res.json({ status: 200, msg: "token valide ", user: user });
  });
};
