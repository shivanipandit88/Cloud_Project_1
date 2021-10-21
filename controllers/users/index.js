const pool = require('../../config/db');


module.exports = {
    index: function (req, res, next) {
        res.render('index', { error: undefined });
    },
    login: function (req, res, next) {
        res.render('login', { error: undefined });
    },
    upload: function (req, res, next) {
        pool.connect((err, client, release) => {
            if (err) {
                res.render('login', { error: err.detail });
            }
            console.log(req.body);
            var username = req.body.username;
            var password = req.body.password;
            client.query('SELECT * FROM users WHERE username=$1', [username], (err, result) => {
                // console.log(result.rows);
                if (result.rows == "") {
                    res.render('login', { error: 'No such username found. If you are a new user please register.' });
                }
                else {
                    pool.connect((err, client, release) => {
                        if (err) {
                            return console.error('Error acquiring client', err.stack)
                        }
                        client.query('SELECT * FROM users WHERE username=$1 AND password=$2', [username, password], (err, result) => {
                            if (result.rows == "") {
                                res.render('login', { error: 'Your password is incorrect.' });
                            }
                            else {
                                pool.connect((err, client, release) => {
                                    if (err) {
                                        return console.error('Error acquiring client', err.stack)
                                    }
                                    if (username == 'admin') {
                                        client.query("SELECT * FROM uploads", (err, result) => {
                                            var upload_result = result.rows
                                            client.query("SELECT * FROM users WHERE username != 'admin'", (err, result) => {
                                                console.log("Admin Data");
                                                console.log(upload_result);
                                                res.render('userdata', { user_data: result.rows, user: username, data: upload_result });
                                            })
                                        })
                                    } else {
                                        client.query('SELECT * FROM uploads WHERE username=$1', [username], (err, result) => {
                                            console.log(result.rows);
                                            var no_data = null;
                                            res.render('userdata', { data: result.rows, user: username, user_data: no_data });
                                        })
                                    }
                                })
                            }
                        })
                    })

                }
            })
        })
    },
    register: function (req, res, next) {
        pool.connect((err, client, release) => {
            if (err) {
                return console.error('Error acquiring client', err.stack);
            }
            console.log(req.body);
            var firstname = req.body.fname;
            var lastname = req.body.lname;
            var username = req.body.username;
            var email = req.body.email;
            var password = req.body.password;
            var sqlinsert = "INSERT INTO users (firstname, lastname, username, email, password) VALUES ($1, $2, $3, $4, $5)";
            var values = [firstname, lastname, username, email, password]
            client.query(sqlinsert, values, (err, result) => {
                if (err) {
                    res.render('index', { error: err.detail });
                    console.log(err);
                }
                else {
                    console.log(result);
                    console.log("Success!!");
                    //redirect user to uploads url
                    client.query('SELECT * FROM uploads where username=$1', [username], (err, result) => {
                        console.log(result.rows);
                        // res.json(result.rows);
                        var no_data = null;
                        res.render('userdata', { data: result.rows, user: username, user_data: no_data });
                    })
                }
            })
        })
    }
};