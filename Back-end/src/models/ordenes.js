const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Ordenes', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        }, 
        cantidadbebidas:{
            type: DataTypes.STRING,
            allowNull: false
        },
        cantidadplatos:{
            type: DataTypes.STRING,
            allowNull: false
        },
        mesa: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        total: {
            type: DataTypes.FLOAT,
            allowNull: false
        }

    }, {
        timestamps: true
    })
}