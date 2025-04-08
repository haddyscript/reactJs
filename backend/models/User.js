const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User  = sequelize.define("user", {
    id: {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name: {
        type : DataTypes.STRING,
        allowNull : false
    },
    email: {
        type : DataTypes.STRING,
        allowNUll : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user", 
    },
});

module.exports = User;