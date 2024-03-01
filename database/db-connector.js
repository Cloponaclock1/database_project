var mysql = require("mysql")



var pool = mysql.createPool({
    connectionLimit:10,
    host:"classmysql.engr.oregonstate.edu",
    user: "cs340_tramillc",
    password: "5245",
    database:"cs340_tramillc"
})



module.exports.pool = pool;