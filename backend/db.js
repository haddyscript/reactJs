const mysql = require('mysql2');
const dotenv = require('dotenv');
const { Sequelize } = require("sequelize");

dotenv.config(); 

const db = mysql.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME
});

db.connect((err)=>{
    if(err){
        console.log("Error connecting to the database: ", err);
        return;
    }
    console.log("Connected to the database");
});

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    }
);

sequelize.sync()
.then(() => {
    console.log("Database synchronized");
})
.catch((err) => {
    console.error("Error synchronizing the database: ", err);
})

module.exports = sequelize;
