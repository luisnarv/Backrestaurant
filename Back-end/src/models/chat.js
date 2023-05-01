const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define('Chat', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        mensaje: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        remitente: {
            type: DataTypes.STRING,
            allowNull: false
        },
        destinatario: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {
        timestamps: false
    })
}