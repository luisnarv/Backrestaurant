const {   allEmplo,
    createEmplo,
    createADMIN,
    loginEmplo,
    imageEmplo,
    newTokenempl} = require ("../controllers/empleados")




const allemploH = async ( req, res) =>{
    let empleados = await allEmplo()
    res.status(200).json(empleados)
}


const createadminH = async ( req, res) => {
    const {name, lastname, password, dni,edad, cargo, salario, direction, phone, email, rol} = req.body

    try {    
        await createADMIN(name, lastname, password, dni,edad, cargo, salario,direction, phone, email, rol);
        res.status(201).json({ msg: 'Created successfully' })
     } catch (error) {
        res.status(400).json({msg: error.message}) 
     }

}
const createemploH = async (req, res) =>{
     const {name, lastname, password, dni, edad, cargo, salario, sex, direction, phone, email, rol} = req.body

     try {    
        await createEmplo(name, lastname, password, dni, edad, cargo, salario, sex, direction, phone, email,rol);
        res.status(201).json({ msg: 'Created successfully' })
     } catch (error) {
        res.status(400).json({msg: error.message})
        
     }
}

const loginemploH = async (req, res) => {
    const {name, password }= req.body
    try {
         const {token, user} = await loginEmplo(name, password)
         res.header('Access-Control-Expose-Headers', 'token')
         res.status(200).header("token", token).json({user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const newtokenemplH = async (req, res) =>{
    const {id} = req.body
    console.log(id)
    try {
        const {token} = await newTokenempl(id)
        console.log(token, "esto es el token ")
        res.header('Access-Control-Expose-Headers', 'token')
        res.status(200).header("token", token).json({ msg: 'Created successfully'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}




const imageemploH = async (req, res) =>{
    const {id} = req.body
    const file = req.files.archivo
    try {
        await imageEmplo(id, file )
        res.status(200).json({msg: 'Created successfully'})
    } catch (error) {
        res.status(400).json({message: error,message})
        
    }
}


module.exports = {
    allemploH,
    createadminH,
    createemploH,
    loginemploH,
    imageemploH,
    newtokenemplH
}