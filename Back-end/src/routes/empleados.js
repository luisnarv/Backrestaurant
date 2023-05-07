const { Router } = require("express")


const { header, body } = require("express-validator")
const validatereq = require('../middlewares/validatereq')
const validateJWT = require("../middlewares/jsonwebtoken")
const { validateAdmin } = require("../middlewares/validateDb")


const { 
    allemploH,
    createadminH,
    createemploH,
    loginemploH,
    imageemploH,
    newtokenemplH
} = require("../handlers/empleados")


const router = Router()

router.get("/all", [
    header("token", "token es obigatorio").not().isEmpty(),
    validatereq,
    validateJWT,
    validateAdmin
], allemploH)

router.post("/newAdmin", [
    header("token", "token es obigatorio").not().isEmpty(),
    body('name', 'Nombre es obligatorio').not().isEmpty(),
    body('lastname', 'Apellido es obligatorio').not().isEmpty(),
    body('password', 'Contraseña es obligatoria').not().isEmpty(),
    body('dni', 'DNI es obligatoria').not().isEmpty(),
    body('cargo', 'Cargo es obligatoria').not().isEmpty(),
    body('salario', 'Salario es obligatoria').not().isEmpty(),
    body('phone', 'Phone es obligatorio').not().isEmpty(),
    body('email', 'Email debe ser válido').isEmail(),
    body('rol', 'Rol  es obligatorio').not().isEmpty(),
    body('edad', 'Edad  es obligatorio').not().isEmpty(),
    body('direction', 'Direction  es obligatorio').not().isEmpty(),

    body('name', 'Nombre debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 25 }),
    body('lastname', 'Apellido debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 25 }),
    body('password', 'Contraseña debe ser de 6 a 25 caracteres de largo').isLength({ min: 6, max: 25 }),
    body('phone', 'Apellido debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 25 }),
    body('email', 'Email debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 25 }),
    validatereq,
    validateJWT,
], createadminH)

router.post("/new", [
    header("token", "token es obigatorio").not().isEmpty(),
    body('name', 'Nombre es obligatorio').not().isEmpty(),
    body('lastname', 'Apellido es obligatorio').not().isEmpty(),
    body('password', 'Contraseña es obligatoria').not().isEmpty(),
    body('dni', 'DNI es obligatoria').not().isEmpty(),
    body('edad', 'Edad es obligatoria').not().isEmpty(),
    body('cargo', 'Cargo es obligatoria').not().isEmpty(),
    body('salario', 'Salario es obligatorio').not().isEmpty(),
    body('direction', 'Direction es obligatorio').not().isEmpty(),
    body('rol', 'Rol es obligatorio').not().isEmpty(),
    body('phone', 'Teléfono es obligatorio').not().isEmpty(),
    body('email', 'Email debe ser válido').isEmail(),
    

    body('name', 'Nombre debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 25 }),
    body('lastname', 'Apellido debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 25 }),
    body('password', 'Contraseña debe ser de 6 a 25 caracteres de largo').isLength({ min: 6, max: 25 }),
    body('cargo', 'Cargo debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 25 }),
    body('direction', 'Apellido debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 25 }),
    body('email', 'Apellido debe ser de 2 a 25 caracteres de largo').isLength({ min: 2, max: 25 }),
    validatereq,
    validateJWT,
    validateAdmin
], createemploH)

router.post("/login", [
    body("name", "Nombre es obligatorio").not().isEmpty(),
    body("password", "Contraseña es obligatorio").not().isEmpty(),
    validatereq
], loginemploH)

router.post("/newtoken", [
    header("token", "token es obigatorio").not().isEmpty(),
    body("id", "Id es obligatorio").not().isEmpty(),
    validatereq,
    validateJWT
], newtokenemplH)

router.post("/photo",[
    validateJWT,
], imageemploH)


module.exports = router