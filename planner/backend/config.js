// Setting up our database connection
const Sequelize = require('sequelize');
const config = new Sequelize("planner", "root1", "password", {dialect: 'mysql'});

module.exports = config; 