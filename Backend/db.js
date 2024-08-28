var mysql2 = require("mysql2");
var db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "asm_angular"
});
db.connect(err => {
    if (err) throw err;
    console.log("Đã kết nối database");
})
module.exports = db;