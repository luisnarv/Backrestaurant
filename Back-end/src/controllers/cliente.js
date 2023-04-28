const bcrypt = require('bcrypt')
const { Op } = require('sequelize')

// helpers
const generateJWT = require('../helpers/generateJsonw')

// models
const { models } = require('../db.js')
const { Clientes } = models


//Todos los usuarios
const userAll = async () => {
    let client = await Clientes.findAll({ where: { deleted: false } })
    return client.map(cli => ({
        id: cli.id,
        lastname: cli.lastname,
        name: cli.name,
        dni: cli.dni,
        email: cli.email,
        phone: cli.numphone,
        img: cli.img
    }))
}


// Crear usuario
const createUser = async (name, lastname, dni, email, password, direction, numphone) => {
    // Generar una contraseña encriptada con bcrypt
    const hash = await bcrypt.hash(password, 10);

    const user = await Clientes.create({
        name, lastname, dni, email, password: hash,
        direction, numphone,
    });
    return user;
}

//Detalle del usuario
const userDetail = async (uid) => {
    console.log(uid)
    const user = await Clientes.findByPk(uid, {
        attributes: { exclude: ["password", "deleted"] }
    })
    return user
}

//Cambiar contraseña
const changePass = async (uid, password) => {
    const pass = await bcrypt.hash(password, 10);

    const [rowsUpdate, [updateUser]] = await Clientes.update(
        { password: pass },
        { where: { id: uid }, returning: true }
    )

    return updateUser
}

//Pasa al usuario es estado delete 
const userDelete = async (uid) => {
    user = await Clientes.findByPk(uid);
    if (user) {
        user.deleted = true
        return await user.save()
    } else {
        throw new error('User not found');
    }
}



//Login de usuario
const userlogin = async (name, password) => {
    const user = await Clientes.findOne({ where: { name } })
    const is = await bcrypt.compare(password, user.password)

    if (!is) throw new Error("usuario y contraseña no coinciden")
    return ({
        token: await generateJWT(user.id),
        user: `${user.name.toUpperCase()}, ${user.lastname}`
    })
}


module.exports = {
    createUser,
    userAll,
    userDetail,
    changePass,
    userDelete,
    userlogin,

}