const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "database-1.cva6sgwm6anh.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "first-project",
  database: "cloudproject",
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Database Connected");
  }
});

module.exports = db;