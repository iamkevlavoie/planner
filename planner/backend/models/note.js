const Sequelize = require('sequelize');
const config = require('../config');

const Note = config.define('note', {
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
    heading: {
        type: Sequelize.STRING,
        allowNull: false
    },
    details: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    
    importance: {
        type: Sequelize.ENUM,
        values: ['low','medium','high'],
        defaultValue: 'medium'
        
    },
   
}, {timestamps: false});

module.exports = Note;