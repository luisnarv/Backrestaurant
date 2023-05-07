const {models} = require ("../db")
const {Clientes, Bebida, Menu, Ordenes, Empleados, Role} = models




const validateAdmin = async (req, res, next) => {
    const {id} = req.body
    let empleado = await Empleados.findOne({where: {id :id}, include:[{model:Role}]})

    if (!empleado) return res.status(401).json({ msg: 'denegado' })
    empleado.Roles[0].rol === 'Administrador' ? next():res.status(401).json({ msg: 'Acceso denegado' }) 
}


module.exports = {validateAdmin}