const { DataTypes } = require("sequelize")


module.exports = (sequelize) => {
    sequelize.define("Proveedor", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        direction: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false
        },
        registration_date: {
            type: DataTypes.DATE,
            allowNull: false
        }

    })
}

/**

fecha_registro (tipo de dato: datetime): Fecha en que se registró el proveedor en el sistema.

 */