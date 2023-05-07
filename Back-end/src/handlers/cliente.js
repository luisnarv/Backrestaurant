
const {  createUser,
    userAll,
    userDetail,
    changePass,
    userDelete,
    userLogin,
    photoUploadUser
} = require("../controllers/cliente")





const userallH = async (req, res) => {
    const users = await userAll()
    res.status(200).json(users)
}

const createuserH = async (req, res) => {
    const { name, lastname, dni, email, password, direction, numphone, } = req.body

    try {
        await createUser(name, lastname, dni, email, password, direction, numphone,)
        res.status(201).json({ msg: 'Created successfully' })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


const userdetailH = async (req, res) => {
    console.log("hol", req.uid)
    const users = await userDetail(req.uid)

    res.status(200).json(users)
}

const changepassH = async (req, res) => {
    try {
        await changePass(req.uid, req.body.password)

        res.status(201).json({ msg: 'Password modified successfully' })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const userdeleteH = async (req, res) => {
    try {
        await userDelete(req.uid)

        res.status(200).json({ msg: 'Deleted successfully' })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


const loginuserH = async (req, res) => {
    const { name, password } = req.body

    try {
        const { token, user } = await userLogin(name, password)
        console.log(token)
        res.header('Access-Control-Expose-Headers', 'token')
        res.status(200).header("token", token).json({ user })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


const photoUploaduserH = async (req, res) =>{
const {id} = req.body
const file = req.files.archivo
try {
    await photoUploadUser(id, file)
    res.status(200).json({msg: 'Created successfully'})
} catch (error) {
    res.status(400).json({message: error.message})
}


}




module.exports = {
    userallH,
    createuserH,
    userdetailH,
    changepassH,
    userdeleteH,
    loginuserH,
    photoUploaduserH
}