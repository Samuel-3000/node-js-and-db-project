const Sequelize = require('sequelize');
const config = require('./../config');

const Student = config.define('Student', {
    idstudent: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    studentname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    section: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    gpa: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    nationality: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {timestamps: false});

module.exports = Student;