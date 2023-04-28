const bcrypt = require("bcrypt")

const generateJSW = require("../helpers/generateJsonw")


const { models } = require("../db");
const { token } = require("morgan");
const { userAll } = require("./cliente");

const { Empleados, Role } = models;


const all = async () => {
    let empleados = await Empleados.findAll({
        include: [{ model: Role }]
    })
    console.log(empleados[0].Roles[0].rol)
    return empleados
}


const create = async (name, lastname, password, dni, edad, cargo, salario, sex, direction, phone, email, rol) => {

    const role = await Role.findByPk(rol);

    const hast = await bcrypt.hash(password, 10)

    const createEm = await Empleados.create({
        name, lastname, password: hast, dni, edad, cargo, salario, sex, direction, phone, email,
    })

    await createEm.setRoles(role)

    return createEm
}

const login = async (name, password) =>{
    let empleado = await Empleados.findOne({where: {name :name}, include:[{model:Role}]})
    const pass = await bcrypt.compare(password, empleado.password)
    if (!pass) throw new Error("usuario y/o contraseña no coinciden")
return ({
    token: await generateJSW(empleado.id),
    user: `${empleado.name.toUpperCase()}, ${empleado.lastname}`,
    role: empleado.Roles[0].rol
}
)

}

module.exports = {
    create,
    all,
    login,
}
