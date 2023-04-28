const { Router } = require('express')

// middlewares
const { header, body } = require('express-validator')
const validatereq = require('../middlewares/validatereq')
const validateJWT = require("../middlewares/jsonwebtoken")
const { validateAdmin } = require("../middlewares/validateDb")

// handlers
const {
    createUserHandler,
    userAllhandler,
    userDetailhandler,
    userDeletehandler,
    changePasshandler,
    loginHandler,
} = require('../handlers/cliente')

const router = Router()


router.post("/login", [
    body("name", "name es obligatorio").not().isEmpty(),
    body("password", "Contraseña es obligatoria ").not().isEmpty(),
    validatereq,
], loginHandler)

router.get("/all", [
    header('token', 'Token es obligatorio').not().isEmpty(),
    validatereq,
    validateJWT,
    validateAdmin,
    ],userAllhandler)


router.post('/new', [
    body('password', 'Contraseña es obligatoria').not().isEmpty(),
    body('email', 'Email es obligatorio').not().isEmpty(),
    body('name', 'Nombre es obligatorio').not().isEmpty(),
    body('lastname', 'Apellido es obligatorio').not().isEmpty(),
    body('email', 'Email debe ser válido').isEmail(),
    body('password', 'Contraseña debe ser de 6 a 25 caracteres de largo').isLength({ min: 6, max: 25 }),
    body('name', 'Nombre debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 25 }),
    body('lastname', 'Apellido debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 25 }),
    body('direction', 'Apellido debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 25 }),
    validatereq
], createUserHandler)

router.get("/detail", [
    validateJWT,
    validatereq,
], userDetailhandler)

router.delete("/", [
    header('token', 'Token es obligatorio').not().isEmpty(),
    validateJWT,
    validatereq,
], userDeletehandler)

router.post("/changepass", [
    header("token", "Token es obligatorio").not().isEmpty(),
    body("password", "Contraseña es obligatoria ").not().isEmpty(),
    validateJWT,
    validatereq,
], changePasshandler)


module.exports = router