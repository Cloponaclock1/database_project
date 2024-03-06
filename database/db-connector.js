var mysql = require("mysql")



var pool = mysql.createPool({
    connectionLimit:10,
    host:"localhost",
    user: "root",
    password: "What12345!",
    database:"cs340_tramillc"
})



module.exports.pool = pool;