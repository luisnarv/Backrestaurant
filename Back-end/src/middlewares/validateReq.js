const { validationResult } = require('express-validator')

const validatereq = (req, res, next) => {
    const errors = validationResult(req)
    // Si hay errores mandalos todos juntos
    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }
    next()
}

module.exports = validatereq