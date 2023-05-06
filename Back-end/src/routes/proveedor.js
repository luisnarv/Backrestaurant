const {Router} = require("express")

const { header, body } = require("express-validator")
const validatereq = require("../middlewares/validatereq")
const validateJWT = require("../middlewares/jsonwebtoken")
const { validateAdmin } = require("../middlewares/validateDb")

const {createhandller} = require ("../handlers/proveedor")

const router = Router()

router.post("/new",[
    header("token", "Token es obligatorio").not().isEmpty(),
    body("name", "Nombre es obligatorio").not().isEmpty(),
    body("lastname", "Apellido es obligatorio").not().isEmpty(),
    body("direction", "Dirección es obligatorio").not().isEmpty(),
    body("phone", "Teléfono es obligatorio").not().isEmpty(),
    body("email", "Correo es obligatorio").not().isEmail(),
    body("product", "Producto es obligatorio").not().isEmpty(),
    body("registration_date", "Fecha de registro es obligatorio").isDate(),

    body('name', 'Nombre debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 100 }),
    body('lastname', 'Apellido debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 100 }),
    validatereq,
    validateJWT,
    validateAdmin
],createhandller)


module.exports= router