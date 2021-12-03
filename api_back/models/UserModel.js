const bcrypt = require("bcryptjs");
const saltRounds = 10;
let randomId = require("random-id");
let len = 30;
let pattern = "aA0";

module.exports = (_db) => {
  db = _db;
  return UserModel;
};

class UserModel {
  static async saveOneUser(req) {
    let key_id = randomId(len, pattern);
    console.log("key_id", key_id);
    let hash = await bcrypt.hash(req.body.password, saltRounds);

    let user = await db.query("SELECT * FROM users WHERE email = ?", [
      req.body.email,
    ]);

    if (user.length > 0) {
      return { status: 501, msg: "email déjà utilisé" };
    }

    return db
      .query(
        'INSERT INTO users (firstName, lastName, email, password, role, creationTimestamp, validate, key_id) VALUES(?, ?, ?, ?, "commercial", NOW(), "no", ?)',
        [req.body.firstName, req.body.lastName, req.body.email, hash, key_id]
      )
      .then((result) => {
        result.key_id = key_id;
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  static async updateValidateUser(key_id) {
    return db
      .query("UPDATE users SET validate = 'yes' WHERE key_id = ?", [key_id])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  static async updateKeyId(email) {
    let key_id = randomId(len, pattern);
    return db
      .query("UPDATE users SET key_id = ? WHERE email = ?", [key_id, email])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  static async updatepassword(newPassword, key_id) {
    let hash = await bcrypt.hash(newPassword, saltRounds);
    return db
      .query("UPDATE users SET password = ? WHERE key_id = ?", [hash, key_id])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  static async getUserByMail(email) {
    return db
      .query("SELECT * FROM users WHERE email = ?", [email])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }
}
