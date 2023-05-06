const { models } = require("../db")
const { Proveedor } = models


const create = async (name, lastname, direction, phone, email, product, registration_date) => {
    const Nue = await Proveedor.create({ name, lastname, direction, phone, email, product, registration_date })
    return Nue
}

module.exports= {
    create
}