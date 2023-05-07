const {Router} = require("express")

const{header,body} = require("express-validator")
const validatereq = require("../middlewares/validatereq")
const validateJWT = require("../middlewares/jsonwebtoken")
const { validateAdmin } = require("../middlewares/validateDb")


const {
allmenuH,
createmenuH,
closedmenuH,
addmenuH,
imagemenuH
 } = require ("../handlers/menu")



const router = Router()

router.get("/all", allmenuH)

router.post("/new",[
   header("token","token es obigatorio").not().isEmpty(),
    body('name', 'Nombre es obligatorio').not().isEmpty(),
    body('description', 'Descripción es obligatorio').not().isEmpty(),
    body('category', 'Categoria es obligatorio').not().isEmpty(),
    body('price', 'El precio es obligatorio').not().isEmpty(),
    
    body('name', 'Nombre debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 25 }),
    body('description', 'La Descripción debe ser de 2 a 100 caracteres de largo').isLength({ min: 2, max: 100 }),
    body('category', 'La Categoria debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 25 }),
    body('price', 'El precio debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 25 }),
    validatereq,
    validateJWT,
    validateAdmin
], createmenuH)

router.post("/add",[
    header("token","token es obigatorio").not().isEmpty(),
    body("id", "id es olbligatorio").not().isEmpty(),
    validatereq,
    validateJWT,
    validateAdmin
], addmenuH)

router.delete("/",[
    header("token","token es obigatorio").not().isEmpty(),
    body("id", "id es olbligatorio").not().isEmpty(),
    validatereq,
    validateJWT,
    validateAdmin
],closedmenuH)


router.post("/image", imagemenuH)

module.exports= router