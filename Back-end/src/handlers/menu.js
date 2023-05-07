const {allMenu,
    createMenu,
    closedMenu,
    addMenu,
    imageMenu} = require("../controllers/menu")


const allmenuH = async (req , res) =>{
    const all = await allMenu()
    res.status(200).json(all)
}

const createmenuH = async (req , res) =>{
    const {name, description, category, price } = req.body;
    try {
        await createMenu(name, description, category, price)
        res.status(200).json({msg: 'Created successfully'})
    } catch (error) {
        res.status(400).json({msg: error.message})
    }
}

const closedmenuH = async (req, res) =>{
    const {id}= req.body
    const plato = await closedMenu(id)
    res.status(200).json(plato)
}
const addmenuH = async (req, res) =>{
    const {id}= req.body
    const plato = await addMenu(id)
    res.status(200).json(plato)
}

const imagemenuH = async (req, res) =>{
    const {id} = req.body
    const file = req.files.archivo
    try {
        await imageMenu(id, file)
        res.status(200).json({msg: "Created successfully"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports ={
    allmenuH,
    createmenuH,
    closedmenuH,
    addmenuH,
    imagemenuH
}