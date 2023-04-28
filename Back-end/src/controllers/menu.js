const {models}= require("../db")
//const {Op} = require ("sequelize")
const {Menu} = models



const allmenu = async() => {
all = await Menu.findAll({where: {deleted : false}});

return all.map(e =>({
    id:e.id,
    product: e.product,
    description: e.description,
    price: e.price,
    category: e.category
}));
}

const createmenu = async(product, description, category, price) =>{
    const create = await Menu.create({product, description, category, price});
    return create;
}

const agotado = async (id) =>{
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

const add = async (id) =>{
    const plato = await Menu.findByPk(id)
    try {
        if (plato.deleted === true){plato.deleted === false}
        return await plato.save()
    } catch (error) {
        return error
    }
}

module.exports = {
    allmenu,
    createmenu,
    agotado,
    add,
}