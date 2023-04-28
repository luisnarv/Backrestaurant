const {allmenu, createmenu, agotado, add} = require("../controllers/menu")


const allmenuhandler = async (req , res) =>{
    const all = await allmenu()
    res.status(200).json(all)
}

const createmenuhandler = async (req , res) =>{
    const {name, description, category, price } = req.body;
    try {
        await createmenu(name, description, category, price)
        res.status(200).json({msg: 'Created successfully'})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

const agotadohandller = async (req, res) =>{
    const {id}= req.body
    const plato = await agotado(id)
    res.status(200).json(plato)
}
const addhandller = async (req, res) =>{
    const {id}= req.body
    const plato = await agotado(id)
    res.status(200).json(plato)
}


module.exports ={
    allmenuhandler,
    createmenuhandler,
    agotadohandller,
    addhandller
}