const {Router} = require("express")

const {header, body} = require("express-validator")
const validatereq = require("../middlewares/validatereq")
const validateJWT = require("../middlewares/jsonwebtoken")
const { validateAdmin } = require("../middlewares/validateDb")

//handllers
const {
    bebidasH,
    createbebidaH,
    closedbebidaH,
    addbebidaH,
    imgbebidaH
} = require("../handlers/bebida")


const router = Router()

router.get("/all", bebidasH)


router.post("/new", [
    header("token", "token es obligatorio").not().isEmpty(),
    body('product', 'Product es obligatorio').not().isEmpty(),
    body('description', 'Descripción es obligatorio').not().isEmpty(),
    body('category', 'Categoria es obligatorio').not().isEmpty(),
    body('price', 'El precio es obligatorio').not().isEmpty(),
    
    body('product', 'Product debe ser de 2 a 50 caracteres de largo').isLength({ min: 2, max: 50 }),
    body('description', 'La Descripción debe ser de 2 a 500 caracteres de largo').isLength({ min: 2, max: 500 }),
    body('category', 'La Categoria debe ser de 2 a 50 caracteres de largo').isLength({ min: 2, max: 50 }),
    body('price', 'El precio debe ser de 2 a 50 caracteres de largo').isLength({ min: 2, max: 50 }),
    validatereq,
    validateJWT,
    validateAdmin
], createbebidaH)


router.delete("/",[
    header("token","token es obigatorio").not().isEmpty(),
    body("id", "id es olbligatorio").not().isEmpty(),
    validatereq,
    validateJWT,
    validateAdmin
],closedbebidaH)

router.post("/add",[
    header("token","token es obigatorio").not().isEmpty(),
    body("id", "id es olbligatorio").not().isEmpty(),
    validatereq,
    validateJWT,
    validateAdmin
],addbebidaH)

router.post("/image",imgbebidaH)


module.exports = router