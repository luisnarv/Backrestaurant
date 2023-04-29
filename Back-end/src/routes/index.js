const { Router } = require('express')
// routers import

const User = require('./cliente.js')
const Bebidas = require ("./bebidas.js")
const Comidas = require ("./menu.js")
const Ordenes = require ("./orden.js")
const Empledos = require ("./empleados.js")


const router = Router()
// routers config
router.use('/users', User)
router.use("/bebidas", Bebidas)
router.use("/comidas", Comidas)
router.use("/ordenes", Ordenes)
router.use("/empleados", Empledos)

 


// main router export
module.exports = router