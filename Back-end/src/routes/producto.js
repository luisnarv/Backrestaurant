const {Router} = require ("express")

const {header, body} = require ("express-validator")
const validatereq = require("../middlewares/validatereq")
const validateJWT = require("../middlewares/jsonwebtoken")
const { validateAdmin } = require("../middlewares/validateDb")

const {createhandller}= require ("../handlers/producto")

const router= Router()

router.post("/new",[
    header("token","Token es obligatorio").not().isEmpty(),
    body("name", "Nombre es obligatorio").not().isEmpty(),
    body("amount", "Cantidad es obligatorio").not().isEmpty(),
    body("price", "Precio es obligatorio").not().isEmpty(),
    body("description", "Descripción es obligatorio").not().isEmpty(),
    body("category", "Categoria es obligatorio").not().isEmail(),
    body("expiration_date", "Fecha de expiracon del producto es obligatorio (Ejemplo 2023/05/03)").isDate(),

    body('name', 'Nombre debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 100 }),
   
    validatereq,
    validateJWT,
    validateAdmin
],createhandller)


module.exports = router