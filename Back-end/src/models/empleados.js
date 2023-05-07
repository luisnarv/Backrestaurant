const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Empleados', {
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
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        sex: {
            type: DataTypes.STRING,
            allowNull: true
        },
        dni: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        cargo: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        salario: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        img: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        direction: {
            type: DataTypes.STRING,
            allowNull: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {
        timestamps: true
    })
}