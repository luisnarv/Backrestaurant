const {create, all, login} = require ("../controllers/empleados")







const allhandller = async ( req, res) =>{
    let empleados = await all()
    res.status(200).json(empleados)
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
         const empl = await login(name, password)
    res.status(200).json(empl)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
   
}

module.exports = {
    createhandller,
    allhandller,
    loginhandller
}