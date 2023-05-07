const jwt = require('jsonwebtoken')

// const generateJWT = (id) => {
//     return new Promise((resolve, reject) => {
//         const payload = { id }

//         jwt.sign(
//             payload,
//             process.env.SECRET_JWT_KEY,
//             { expiresIn: '7d' },
//             (err, token) => {
//                 if (err) {
//                     console.log(err)
//                     reject('No se pudo generar el token')
//                 }
//                 resolve(token)
//             })
//     })
// }


  const generateJWT = (id) => {
    return new Promise((resolve, reject) => {
        const payload = { id }
        jwt.sign(
             payload,
            process.env.SECRET_JWT_KEY, 
            { expiresIn: 40 * 45},
            (err, token) => {
                if (err) {
                    console.log(err)
                    reject('No se pudo generar el token')
                }
                resolve(token)
            })
    })
}



module.exports = generateJWT