var mysql = require('mysql');
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'dbid233',
    password : 'dbpass233',
    database : 'db23303',
    multipleStatements: true
});
db.connect();
module.exports = db;
