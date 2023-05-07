const { allBebidas,
    Bebidas,
    createBebida,
    closedBebidas,
    addBebidas,
    imgBebidas } = require("../controllers/bebidas")




const bebidasH = async (req, res) => {
    const bebida = await Bebidas()
    res.status(200).json(bebida)
}


const createbebidaH = async (req, res) => {
    const { product, description, category, price } = req.body

    try {
        await createBebida(product, description, category, price)
        res.status(201).json({ msg: 'Created successfully' })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const closedbebidaH = async (req, res) => {
    const { id } = req.body
    const bebida = await closedBebidas(id)
    res.status(200).json(bebida)
}

const addbebidaH = async (req, res) => {
    const { id } = req.body
    const bebida = await addBebidas(id)
    res.status(200).json(bebida)
}

const imgbebidaH = async (req, res) => {
    const { id } = req.body
    const file = req.files.archivo
    try {
        await imgBebidas(id, file)
        res.status(200).json({ msg: "Created successfully" })
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

module.exports = {
    bebidasH,
    createbebidaH,
    closedbebidaH,
    addbebidaH,
    imgbebidaH
}