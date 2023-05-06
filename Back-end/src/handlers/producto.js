const {create}= require ("../controllers/producto")



const createhandller = async (req, res) =>{
    const {name, amount, price, description, category, img,expiration_date, ProveedorId} = req.body
     try {
        await create(name, amount, price, description, category, img,expiration_date, ProveedorId)
        res.status(200).json({msg: "Created successfull"})
     } catch (error) {
        res.status(400).json({msg: error.message})
     }

}

module.exports = {createhandller}