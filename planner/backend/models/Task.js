const Sequelize = require('sequelize');
const config = require('../config');

const Task = config.define('task', {
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
        // allowNull: false
    },
    // progress_level: {
    //     type: Sequelize.STRING,
    //     allowNull: false
    // }
}, {timestamps: false});

module.exports = Task;