const { bebidas,createBebida,agotado,add} = require("../controllers/bebidas")





const bebidashandller = async (req, res)=> {
    const bebida = await bebidas()
    res.status(200).json(bebida)
}


const createBebidahandller = async (req, res) => {
    const {product, description, category, price} =req.body

    try {
        await createBebida(product, description, category, price)
        res.status(201).json({msg: 'Created successfully'})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

const agotadohandller = async (req , res) => {
    const {id} = req.body
    const bebida = await agotado(id)
    res.status(200).json(bebida)
}

const addhandller = async (req , res) => {
    const {id} = req.body
    const bebida = await add(id)
    res.status(200).json(bebida)
}

module.exports = {
    bebidashandller,
    createBebidahandller,
    agotadohandller,
    addhandller,
}