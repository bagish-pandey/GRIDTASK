const mysql = require("mysql2");

// const conn = mysql.createConnection({
//     user:process.env.DB_USER ,
//     host:process.env.DB_HOST,
//     password:process.env.DB_PASSWORD,
//     database:process.env.DB_DATABASE
// });

const conn = mysql.createConnection({
    user:"root" ,
    host:"localhost",
    password:"root",
    database:"gridtask_employee"
});
conn.connect((err)=>{
    if(err) throw err;
    console.log("DB connected");
});


module.exports = conn;