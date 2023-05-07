const { models } = require('../db.js')
const { Op } = require('sequelize');
const { Bebida } = models

const { uploadPhotoproduct } = require("./img.js")




//Todas las bebidas
const allBebidas = async () => {
    let all = await Bebida.findAll();

    return all.map(e => ({
        id: e.id,
        product: e.product,
        description: e.description,
        price: e.price,
        category: e.category

    }));
}
//Bebidas en stock
const Bebidas = async () => {
    let all = await Bebida.findAll({ where: { deleted: false } });

    return all
}

//Bebida agotada
const closedBebidas = async (id) => {
    const bebida = await Bebida.findByPk(id)
    try {
        if (bebida.deleted === false) {
            bebida.deleted = true
        }
        return await bebida.save()
    } catch (error) {
        return error
    }
}

//Crear bebida
const createBebida = async (product, description, category, price) => {
    const newBebida = await Bebida.create({
        product, description, category, price
    });
    return newBebida;
}

//
const addBebidas = async (id) => {
    const bebida = await Bebida.findByPk(id)
    try {
        if (bebida.deleted === true) {
            bebida.deleted = false
        }
        return await bebida.save()
    } catch (error) {
        return error
    }
}

const imgBebidas = async (id, file) => {
    const ID = await Bebida.findByPk(id)
    ID.img = await uploadPhotoproduct(file)
    return await ID.save()
}


module.exports = {
    allBebidas,
    Bebidas,
    createBebida,
    closedBebidas,
    addBebidas,
    imgBebidas
}