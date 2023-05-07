const { DataTypes } = require('sequelize')
//const IMG = require("../../img/300px")

module.exports = (sequelize) => {
    sequelize.define('Clientes', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        dni: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true
        },
        direction: {
            type: DataTypes.STRING,
            allowNull: true
        },
        numphone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue:"usuario"
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },

    }, {
        timestamps: false
    })
}