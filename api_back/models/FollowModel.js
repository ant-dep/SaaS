module.exports = (_db) => {
  db = _db;
  return FollowModel;
};

class FollowModel {
  static async saveOneFollow(req) {
    let sql = `INSERT INTO follows (prospect_id, user_id, creationTimestamp, callDateTime, description, type) VALUES (?, ?, NOW(), ?, ?, ?)`;
    return db
      .query(sql, [
        req.body.prospect_id,
        req.body.user_id,
        req.body.callDateTime,
        req.body.description,
        req.body.type,
      ])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  static async getAllFollow(user_id) {
    let sql = `SELECT * FROM follows WHERE user_id = ?  ORDER BY callDateTime`;
    return db
      .query(sql, [user_id])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  static async getOneFollow(id) {
    let sql = `SELECT * FROM follows WHERE id = ?`;
    return db
      .query(sql, [id])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  static async updateFollow(req, id) {
    let sql = `UPDATE follows SET prospect_id = ?, user_id = ?, callDateTime = ?, description = ?, type = ? WHERE id = ?`;
    return db
      .query(sql, [
        req.body.prospect_id,
        req.body.user_id,
        req.body.callDateTime,
        req.body.description,
        req.body.type,
        id,
      ])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }

  static async deleteOneFollow(id) {
    let sql = `DELETE FROM follows WHERE id = ?`;
    return db
      .query(sql, [id])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return err;
      });
  }
}
