const { 
    allOrder,
    createOrder,} = require("../controllers/ordenes")





const allorderH = async (req, res) =>{
    let orden = await allOrder();
    res.status(200).json(orden)
}
 


const createorderH = async (req , res) => {
    const {ClienteId, EmpleadoId, cantidadbebidas, cantidadplatos  , BebidaId, MenuId, mesa} = req.body

   // console.log( "hola" +ClienteId, EmpleadoId , BebidaId, MenuId, mesa, total)

    try {
        await createOrder(ClienteId, EmpleadoId, cantidadbebidas, cantidadplatos  , BebidaId, MenuId, mesa)
        res.status(200).json({msg: "Created successfull"})
    } catch (error) {
        res.status(400).json({msg: error.message})
        
    }
}

module.exports={
    allorderH,
    createorderH,
}
