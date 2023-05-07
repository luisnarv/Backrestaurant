const { models } = require("../db")
const { Producto } = models

const create = async (name, amount, price, description, category, img, expiration_date, ProveedorId) => {
    const create = Producto.create({ name, amount, price, description, category, img, expiration_date, ProveedorId })
    return create
}


module.exports = { create }