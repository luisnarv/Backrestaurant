const bcrypt = require("bcrypt")

const generateJSW = require("../helpers/generateJsonw")
const { models } = require("../db");
const generateJWT = require ("../helpers/generateJsonw")

const { uploadPhoto } = require("./img")

const { Empleados, Role } = models;


const allEmplo = async () => {
    let empleados = await Empleados.findAll({
        include: [{ model: Role }]
    })
    console.log(empleados[0].Roles[0].rol)
    return empleados
}


const createEmplo = async (name, lastname, password, dni, edad, cargo, salario, sex, direction, phone, email, rol) => {
    const role = await Role.findByPk(rol);
    const hast = await bcrypt.hash(password, 10)
    const createEm = await Empleados.create({
        name, lastname, password: hast, dni, edad, cargo, salario, sex, direction, phone, email,
    })
    await createEm.setRoles(role)
    return createEm
}

const createADMIN = async (name, lastname, password, dni, edad, cargo, salario, direction, phone, email, rol) => {
    const role = await Role.findByPk(rol);
    const hast = await bcrypt.hash(password, 10)
    const createEm = await Empleados.create({
        name, lastname, password: hast, dni, edad, cargo, salario, direction, phone, email
    })
    await createEm.setRoles(role)
    return createEm

}



const loginEmplo = async (name, password) => {
    const empleado = await Empleados.findOne({ 
        where: { name: name }, 
        include: [{ model: Role }] 
    })

     if (empleado) {
        const pass = await bcrypt.compare(password, empleado.password)
        if (empleado.name === "Administrador\n" && password === "@dmin"  ) {
          return ({
            token: await generateJSW(empleado.id),
            user: `${empleado.name.toUpperCase()}, ${empleado.lastname}`,
            role: empleado.Roles[0].rol
        }) 
    }else if (!pass){
         throw new Error("usuario y/o contraseña no coinciden")
    }
        return ({
            token: await generateJSW(empleado.id),
            user: `${empleado.name.toUpperCase()}, ${empleado.lastname}`,
            role: empleado.Roles[0].rol
        })
}}


const newTokenempl = async (id) => {
    const empl = await Empleados.findOne({ where: { id: id } })
    return ({
        token: await generateJWT(empl.id),
    })
}








const imageEmplo = async (id, file) => {
    const ID = await Empleados.findByPk(id)
    ID.img = await uploadPhoto(file)
    return await ID.save()
}


module.exports = {
    allEmplo,
    createEmplo,
    createADMIN,
    loginEmplo,
    imageEmplo,
    newTokenempl
}

