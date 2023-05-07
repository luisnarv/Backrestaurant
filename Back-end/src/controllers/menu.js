const { models } = require("../db")
//const {Op} = require ("sequelize")
const { Menu } = models

const { uploadPhotoproduct } = require("./img")



const allMenu = async () => {
    all = await Menu.findAll({ where: { deleted: false } });

    return all
}

const createMenu = async (product, description, category, price) => {
    const create = await Menu.create({ product, description, category, price });
    return create;
}

const closedMenu = async (id) => {
    const plato = await Menu.findByPk(id)
    try {
        if (plato.deleted === false) {
            plato.deleted = true
        }
        return await plato.save()
    } catch (error) {
        return error
    }
}

const addMenu = async (id) => {
    const plato = await Menu.findByPk(id)
    try {
        if (plato.deleted === true) { plato.deleted === false }
        return await plato.save()
    } catch (error) {
        return error
    }
}

const imageMenu = async (id, file) => {
    const ID = await Menu.findByPk(id)
    ID.img = await uploadPhotoproduct(file)
    return await ID.save()
}

module.exports = {
    allMenu,
    createMenu,
    closedMenu,
    addMenu,
    imageMenu
}