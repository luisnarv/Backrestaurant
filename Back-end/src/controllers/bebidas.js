const { models } = require('../db.js')
const { Op } = require('sequelize');
const { Bebida } = models


//Todas las bebidas
const all = async () =>{
    let all = await Bebida.findAll();
 
    return  all.map(e =>({
     id: e.id,
     product: e.product,
     description: e.description,
     price: e.price,
     category: e.category
 
    }));
}
 //Bebidas en stock
const bebidas = async () =>{
   let all = await Bebida.findAll({where: {deleted : false}});

   return  all.map(e =>({
    id: e.id,
    product: e.product,
    description: e.description,
    price: e.price,
    category: e.category

   }));
}

//Crear bebida
const createBebida = async (product, description, category, price) => {

    const newBebida = await Bebida.create({
        product, description, category, price
    });
    return newBebida;
}

//Bebida agotada
const agotado = async (id) =>{
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
//
const add = async (id) =>{
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

module.exports = {
    bebidas,
    createBebida,
    agotado,
add
}