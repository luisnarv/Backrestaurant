RUTAS
------------------------Bebidas------------------------
GET /bebidas/all
POST /bebidas/new
POST /bebidas/add
POST /bebidas//image
DELETE /bebidas

------------------------Menu------------------------
GET /comidas/all
POST /comidas/new
POST /comidas/add
POST /comidas//image
DELETE /comidas


------------------------usuarios------------------------
GET /users/all
GET /users/detail
POST /users/login
POST /users/new
POST /users/changepass
POST /users/photo
DELETE /users

------------------------Empledos------------------------
GET /empleados/all
POST /empleados/login
POST /empleados/new
POST /empleados//photo
POST /producto/new
POST /empleados/newAdmin

------------------------Ordenes------------------------
GET /ordenes/all
POST /ordenes/new


------------------------WebSocket------------------------
wscat -c ws://localhost:3000

------------------------producto------------------------
POST /producto/new
------------------------proveedor------------------------
POST /proveedor/new