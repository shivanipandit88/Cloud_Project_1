const pool = require('../../config/db');


module.exports = {
  index: function (req, res, next) {

    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack)
      }
      client.query('SELECT * FROM uploads', (err, result) => {
        console.log(result.rows);
        // res.json(result.rows);
        var no_data = null;
        res.render('userdata', { data: result.rows, user: username, user_data: no_data });
      })
    })
  },
  create: function (req, res, next) {
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      // console.log(req.files);
      console.log("body: ");
      console.log(req.files);
      console.log("original_name:")
      console.log(req.files[0].originalname);
      var uploads = req.files[0].originalname;
      var description = req.body.description;
      var username = req.body.username;
      var sqlselect = "SELECT * FROM uploads WHERE username=$1";
      var sqlinsert = "INSERT INTO uploads (file, descriptions, username) VALUES ($1, $2, $3)";
      var values = [uploads, description, username];
      client.query(sqlinsert, values, (err, result) => {
        if (err) {
          res.sendStatus(500);
          console.log(err);
        }
        else {
          console.log(result);
          console.log("Success!!");
          if (username == 'admin') {
            client.query("SELECT * FROM uploads", (err, result) => {
              var upload_result = result.rows
              client.query("SELECT * FROM users WHERE username != admin", (err, result) => {
                console.log("Admin Data");
                console.log(upload_result);
                res.render('userdata', { user_data: result.rows, user: username, data: upload_result });
              })
            })
          } else {
            client.query(sqlselect, [username], (err, result) => {
              console.log(result.rows);
              var no_data = null;
              res.render('userdata', { data: result.rows, user: username, user_data: no_data });
            })
          }
        }
      })
    })
  },
  delete: function (req, res, next) {
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      // console.log(req.files);
      console.log("Detele: ");
      console.log(req.body.data_id);
      var id = req.body.data_id
      var username = req.body.data_user;
      var sqlselect = "SELECT * FROM uploads WHERE username=$1";
      var sqldelete = "DELETE FROM uploads WHERE id=$1";
      var values = [id];
      client.query(sqldelete, values, (err, result) => {
        if (err) {
          res.sendStatus(500);
          console.log(err);
        }
        else {
          console.log(result);
          console.log("Success!!");
          if (username == 'admin') {
            client.query("SELECT * FROM uploads", (err, result) => {
              var upload_result = result.rows
              client.query("SELECT * FROM users WHERE username != admin", (err, result) => {
                console.log("Admin Data");
                console.log(upload_result);
                res.render('userdata', { user_data: result.rows, user: username, data: upload_result });
              })
            })
          } else {
            client.query(sqlselect, [username], (err, result) => {
              console.log(result.rows);
              var no_data = null;
              res.render('userdata', { data: result.rows, user: username, user_data: no_data });
            })
          }
        }
      })
    })
  }
};