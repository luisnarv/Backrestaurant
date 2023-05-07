require('dotenv').config()
const { Sequelize } = require('sequelize')

//variables de entorno 
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env

//importamos modelos 
const clientes = require('./models/clientes')
const bebida = require('./models/bebidas')
const empleados = require('./models/empleados')
const menu = require('./models/menu')
const ordenes = require('./models/ordenes')
const role = require("./models/rol")
const chat = require ("./models/chat")
const gastos = require ("./models/gastos")
const producto = require ("./models/producto")
const proveedor = require ("./models/proveedor")



//conexión a DB
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
})

//definimos modelos 
clientes(sequelize)
bebida(sequelize)
empleados(sequelize)
menu(sequelize)
ordenes(sequelize)
role(sequelize)
chat(sequelize)
gastos(sequelize)
producto(sequelize)
proveedor(sequelize)

//modelos en destructuring
const {
  Clientes, Bebida, Menu, Ordenes, Empleados, Role, Chat, Gastos, Producto, Proveedor
} = sequelize.models

//relaciones 

Proveedor.belongsToMany(Producto, {through:"Proveproduct", timestamps: false })
Producto.belongsToMany(Proveedor, {through:"Proveproduct", timestamps: false })




Clientes.hasMany(Ordenes)
Ordenes.belongsTo(Clientes)

Clientes.hasMany(Ordenes)
Ordenes.belongsTo(Clientes)

Empleados.hasMany(Ordenes)
Ordenes.belongsTo(Empleados)

Empleados.belongsToMany(Role, { through: "EmpleadosRole", timestamps: false });
Role.belongsToMany(Empleados, { through: "EmpleadosRole", timestamps: false });

Ordenes.belongsToMany(Bebida, { through: "OrdenesBebida", timestamps: false });
Bebida.belongsToMany(Ordenes, { through: "OrdenesBebida", timestamps: false });

Ordenes.belongsToMany(Menu, { through: "OrdenesMenu", timestamps: false });
Menu.belongsToMany(Ordenes, { through: "OrdenesMenu", timestamps: false });


module.exports = sequelize