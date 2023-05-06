const {createADMIN, create, all, login} = require ("../controllers/empleados")







const allhandller = async ( req, res) =>{
    let empleados = await all()
    res.status(200).json(empleados)
}


const createADMINhandller = async ( req, res) => {
    const {name, lastname, password, dni,edad, cargo, salario, direction, phone, email, rol} = req.body

    
    try {    
        await createADMIN(name, lastname, password, dni,edad, cargo, salario,direction, phone, email, rol);
        res.status(201).json({ msg: 'Created successfully' })
     } catch (error) {
        res.status(400).json({msg: error.message})
        
     }

}
const createhandller = async (req, res) =>{
     const {name, lastname, password, dni, edad, cargo, salario, sex, direction, phone, email, rol} = req.body

     try {    
        await create(name, lastname, password, dni, edad, cargo, salario, sex, direction, phone, email,rol);
        res.status(201).json({ msg: 'Created successfully' })
     } catch (error) {
        res.status(400).json({msg: error.message})
        
     }
}

const loginhandller = async (req, res) => {
    const {name, password }= req.body
    try {
         const {token, user} = await login(name, password)
         res.header('Access-Control-Expose-Headers', 'token')
         res.status(200).header("token", token).json({user})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
   
}

module.exports = {
    createADMINhandller,
    createhandller,
    allhandller,
    loginhandller
}