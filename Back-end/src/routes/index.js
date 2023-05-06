const { Router } = require('express')
// routers import

const User = require('./cliente.js')
const Bebidas = require ("./bebidas.js")
const Comidas = require ("./menu.js")
const Ordenes = require ("./orden.js")
const Empledos = require ("./empleados.js")
const Proveedor = require ("./proveedor.js")
const Producto = require ("./producto.js")


const router = Router()
// routers config
router.use('/users', User)
router.use("/bebidas", Bebidas)
router.use("/comidas", Comidas)
router.use("/ordenes", Ordenes)
router.use("/empleados", Empledos)
router.use("/proveedor", Proveedor)
router.use("/producto", Producto)

 


// main router export
module.exports = router