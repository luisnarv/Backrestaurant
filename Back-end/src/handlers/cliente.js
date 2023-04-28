
const{createUser, userAll, userDetail, userDelete, changePass, userlogin
} = require ("../controllers/cliente")





const userAllhandler = async (req, res)=>{
const users = await userAll()
res.status(200).json(users)
}

const createUserHandler = async (req, res) => {
    const {name, lastname, dni, email, password, direction, numphone,  } = req.body

    try {
        await createUser(name, lastname, dni, email, password, direction, numphone,)
        res.status(201).json({ msg: 'Created successfully' })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


const userDetailhandler = async (req, res) => {
    console.log("hol",req.uid)
    const users = await userDetail(req.uid)

    res.status(200).json(users)
}

const changePasshandler = async (req, res) => {
    try {
        await changePass(req.uid, req.body.password)
        
        res.status(201).json({ msg: 'Password modified successfully' })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const userDeletehandler = async (req, res) => {
    try {
        await userDelete(req.uid)
        
        res.status(200).json({msg:  'Deleted successfully' })
    } catch (error) {
        res.status(400).json({ msg: error.message})
    }
}


const loginHandler = async (req, res) => {
const {name, password} = req.body

try {
    const {token, user   } = await userlogin(name, password)
    console.log(token)
    res.header('Access-Control-Expose-Headers', 'token')
    res.status(200).header("token", token).json({user})
} catch (error) {
    res.status(400).json({msg: error.message})
}
}



module.exports= {
    createUserHandler,
    userAllhandler,
    userDeletehandler,
    userDetailhandler,
    changePasshandler,
    loginHandler,

}