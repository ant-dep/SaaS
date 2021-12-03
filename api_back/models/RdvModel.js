module.exports = (_db) => {
  db = _db;
  return RdvModel;
};

class RdvModel {
  static async saveOneRdv(req) {
    let sql =
      "INSERT INTO rdv (name, startDateTime, endDateTime, classes, user_id, _id) VALUES (?, ?, ?, ?, ?, ?)";
    return db
      .query(sql, [
        req.body.name,
        req.body.startDateTime,
        req.body.endDateTime,
        req.body.classes,
        req.body.user_id,
        req.body._id,
      ])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  static async getAllRdv(user_id) {
    let sql = "SELECT * FROM rdv WHERE user_id = ?";
    return db
      .query(sql, [user_id])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  static async getOneRdv(id) {
    let sql = "SELECT * FROM rdv WHERE id = ?";
    return db
      .query(sql, [id])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  static async updateRdv(req, _id) {
    let sql =
      "UPDATE rdv SET name = ?, startDateTime = ?, endDateTime = ?, classes = ? WHERE _id = ?";
    return db
      .query(sql, [
        req.body.name,
        req.body.startDateTime,
        req.body.endDateTime,
        req.body.classes,
        _id,
      ])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  static async deleteOneRdv(_id) {
    let sql = "DELETE FROM rdv WHERE _id = ?";
    return db
      .query(sql, [_id])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }
}
