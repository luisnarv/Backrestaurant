
const {create} = require ("../controllers/proveedor")



const createhandller = async (req, res) =>{
    const {name, lastname, direction, phone, email, product, registration_date} = req.body

    try {await create (name, lastname, direction, phone, email, product, registration_date)
        res.status(200).json({msg: "Created successfull"})
     } catch (error) {
        res.status(400).json({msg: error.message})
     }
}

module.exports= {
    createhandller
}