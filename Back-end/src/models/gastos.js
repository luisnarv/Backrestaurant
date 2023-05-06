const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("Gastos", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        fecha: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        monto: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING
        },
    }, {
        timestamps: true
    });
}
