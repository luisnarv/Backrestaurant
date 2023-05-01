const jwt = require('jsonwebtoken')

const validateJWT = (req, res, next) => {
    const token = req.header('token')
    // Verificar la firma del token
    try {
        const { id } = jwt.verify(token, process.env.SECRET_JWT_KEY)
        req.id = id
        console.log("este es verificacion del token",req.id)
        next()
    } catch (error) {
        res.status(401).json({ msg: token })
    }
}

module.exports = validateJWT