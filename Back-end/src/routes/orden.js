const { Router } = require("express")

const { header, body } = require("express-validator")
const validatereq = require("../middlewares/validatereq")
const validateJWT = require("../middlewares/jsonwebtoken")
const { validateAdmin } = require("../middlewares/validateDb")

const {
  allorderH,
  createorderH, } = require("../handlers/ordenes")


const router = Router()

router.get("/all", [

], allorderH)


router.post("/new", [
  header("token", "token es obigatorio").not().isEmpty(),
  body('ClienteId', 'Nombre es obligatorio').not().isEmpty(),
  body('EmpleadoId', 'Empleadoid es obligatorio').not().isEmpty(),
  body('cantidadplatos', 'Cantidad es obligatorio').not().isEmpty(),
  body('cantidadbebidas', 'Cantidad es obligatorio').not().isEmpty(),
  body('mesa', 'Mesa es obligatorio').not().isEmpty(),
  // body('total', 'El precio es obligatorio').not().isEmpty(),

  body('ClienteId', 'Nombre debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 100 }),
  body('EmpleadoId', 'Nombre debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 100 }),
  body('cantidadbebidas', 'La Categoria debe ser de 2 a 25 caracteres de largo').isLength({ min: 1, max: 100 }),
  body('cantidadplatos', 'La Descripción debe ser de 2 a 100 caracteres de largo').isLength({ min: 1, max: 100 }),
  body('mesa', 'El precio debe ser de 2 a 25 caracteres de largo').isLength({ min: 1, max: 25 }),
  validatereq,
  validateJWT,
  validateAdmin
], createorderH)


module.exports = router