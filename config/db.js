require('dotenv').config()

const { Pool, Client } = require("pg");

const credentials = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT, 10)
};

// Connect with a connection pool.
const pool = new Pool(credentials);

module.exports = pool