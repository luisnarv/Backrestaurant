const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },     
        rol:{
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: true
    })
}