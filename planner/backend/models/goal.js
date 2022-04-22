const Sequelize = require('sequelize');
const config = require('../config');

const Goal = config.define('goal', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date_of_start: {
        type: Sequelize.STRING,
        allowNull: false
    },
    date_of_end: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM,
        values: ['not done','started','completed'],
        defaultValue: 'not done'
        
    },
    
}, {timestamps: false});

module.exports = Goal;