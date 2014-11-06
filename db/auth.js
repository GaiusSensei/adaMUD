var db = require('./mssql'),
    errors = require('./errors');
db.login = function loginF(username, password, callback) {
    var SHA512 = require("crypto-js/sha512"),
        q = "select top 1 * from dbo.auth where username=\'" + username + "\' and password=\'" + SHA512(password).toString() + "\'";
    db.query(q, function qr(err, result) {
        if(err) {
            callback(false, errors.parse(err)); // DB Error
        } else if(result.length > 0) {
            if(result[0].isActive) {
                callback(true, result[0]); // User Authenticated!
            } else {
                callback(false, errors.get(2)); // Inactive User
            }
        } else {
            callback(false, errors.get(1)); // No Users Matched
        }
    });
};
module.exports = db;