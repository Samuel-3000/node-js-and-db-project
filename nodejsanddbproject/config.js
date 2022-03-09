//setting up our database connectiona
const Sequelize = require('sequelize');

const config = new Sequelize("students1", "", "", {dialect: 'mysql'});

//put in user and password to make it work


module.exports = config;