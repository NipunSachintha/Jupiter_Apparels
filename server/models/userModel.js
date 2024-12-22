const db = require('../config/db');

const UserModel = {
    findByUserName: (username, callback) => {
        const query = 'SELECT db_login_data(?)';
        db.query(query, [username], (err, result) => {
          if (err) {
            return callback(err);
          }
          callback(null, result[0]);
        });
      },
}

module.exports = UserModel;