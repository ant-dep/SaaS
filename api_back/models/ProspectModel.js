module.exports = (_db) => {
  db = _db;
  return ProspectModel;
};

class ProspectModel {
  static async saveOneProspect(req) {
    let sql = `INSERT INTO prospect (firstName, lastName, company, address, zip, city, status, email, phone, creationTimestamp, description, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?)`;
    return db
      .query(sql, [
        req.body.firstName,
        req.body.lastName,
        req.body.company,
        req.body.address,
        req.body.zip,
        req.body.city,
        req.body.status,
        req.body.email,
        req.body.phone,
        req.body.description,
        req.body.user_id,
      ])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }

  static async getAllProspect(user_id) {
    let sql = `SELECT * FROM prospect WHERE user_id = ? ORDER BY creationTimestamp`;
    return db
      .query(sql, [user_id])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }

  static async getOneProspect(id) {
    let sql = `SELECT * FROM prospect WHERE id = ?`;
    return db
      .query(sql, [id])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }

  static async updateProspect(req, id) {
    let sql = `UPDATE prospect SET firstName = ?, lastName = ?, company = ?, address = ?, zip = ?, city = ?, status = ?, email = ?, phone = ?, description = ? WHERE id = ?`;
    return db
      .query(sql, [
        req.body.firstName,
        req.body.lastName,
        req.body.company,
        req.body.address,
        req.body.zip,
        req.body.city,
        req.body.status,
        req.body.email,
        req.body.phone,
        req.body.description,
        id,
      ])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }

  static async deleteOneProspect(id) {
    let sql = `DELETE FROM prospect WHERE id = ?`;
    return db
      .query(sql, [id])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw err;
      });
  }
}
