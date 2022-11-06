const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// 单捞磐海捞胶 connection 按眉 积己
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

// MySQL connection 角青
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database. ");
})

module.exports = connection;