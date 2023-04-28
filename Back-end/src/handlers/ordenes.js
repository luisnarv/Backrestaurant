const {create, all} = require("../controllers/ordenes")





const allhandller = async (req, res) =>{
    let orden = await all();
    res.status(200).json(orden)
}
 


const createordenhandller = async (req , res) => {
    const {ClienteId, EmpleadoId, cantidadbebidas, cantidadplatos  , BebidaId, MenuId, mesa} = req.body

   // console.log( "hola" +ClienteId, EmpleadoId , BebidaId, MenuId, mesa, total)

    try {
        await create(ClienteId, EmpleadoId, cantidadbebidas, cantidadplatos  , BebidaId, MenuId, mesa)
        res.status(200).json({msg: "Created successfull"})
    } catch (error) {
        res.status(400).json({msg: error.message})
        
    }
}

module.exports={
    createordenhandller,
    allhandller,
}
