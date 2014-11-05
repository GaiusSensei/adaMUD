var express = require('express');
var db = require('mssql');
// initialize variables
var app = express();
db.config = {
    user:"",
    password:"",
    server:"",
    database:""
}
// database setup
if (app.get('env') === 'development') {
    var codiodb = require('../.codiodb');
    db.config.user = codiodb.adamuddb_userid;
    db.config.password = codiodb.adamuddb_password;
    db.config.server = codiodb.adamuddb_server;
    db.config.database = codiodb.adamuddb_database;
} else {
    db.config.user = process.env.adamuddb_userid;
    db.config.password = process.env.adamuddb_password;
    db.config.server = process.env.adamuddb_server;
    db.config.database = process.env.adamuddb_database;
}
module.exports = db;