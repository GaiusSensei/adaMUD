var express = require('express');
var db = require('mssql');
// initialize variables
var app = express();
db.config = {
    user: "",
    password: "",
    server: "",
    database: "",
    options: {
        encrypt: true
    }
}
// database setup
if(app.get('env') === 'development') {
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
// methods
db.heartbeat = function heartbeatF(s, callback) {
    db.connect(db.config, function(err) {
        var req = new db.Request();
        req.query('select \'' + s + '\' as beat', function(err, recordset) {
            var r = "";
            if(err) {
                console.dir("Error: " + err);
                r = "Error: " + err;
            } else {
                console.dir(recordset);
                r = recordset[0].beat.toString();
            }
            callback(r);
        });
    });
};
db.query = function queryF(query, callback) {
    db.connect(db.config, function(err) {
        var req = new db.Request();
        req.query(query, callback);
    });
};
module.exports = db;