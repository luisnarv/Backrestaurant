
const {createProveedor} = require ("../controllers/proveedor")



const createproveedorH = async (req, res) =>{
    const {name, lastname, direction, phone, email, product, registration_date} = req.body

    try {await createProveedor (name, lastname, direction, phone, email, product, registration_date)
        res.status(200).json({msg: "Created successfull"})
     } catch (error) {
        res.status(400).json({msg: error.message})
     }
}

module.exports= {
    createproveedorH
}