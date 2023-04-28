const { models } = require("../db");
const { Ordenes, Bebida, Menu, Empleados, Clientes } = models


const all = async () => {
    // const bebidaTableName = Bebida.getTableName();

    // console.log("Nombre de tabla intermedia para la relación con Bebida:", bebidaTableName);

    const orden = await Ordenes.findAll({
        include: [
            {model: Bebida},
            { model: Menu}
        ]
    });
    return orden;
}




const create = async (ClienteId, EmpleadoId, cantidadbebidas, cantidadplatos, BebidaId, MenuId, mesa) => {
    let subtotal = 0;
    let valor = 0;
    let valor2 = 0;
    let beb = false
    let com = false


    if (!await Clientes.findByPk(ClienteId)) throw new Error("Cliente not Found")
    if (!await Empleados.findByPk(EmpleadoId)) throw new Error("Empleado not Found")

        if (BebidaId) {
            for (let i = 0; i < BebidaId.length; i++) {
                const bebida = await Bebida.findByPk(BebidaId[i]);
                bebida ? valor += bebida.price * cantidadbebidas[i] : 0;
                bebida ? beb = true : false
            }
        }
        if (MenuId) {
            for (let i = 0; i < MenuId.length; i++) {
                const comida = await Menu.findByPk(MenuId[i]);
                comida ? valor2 = comida.price * cantidadplatos[i] : 0;
                comida ? com = true : false
            }
        }
    
//--------------------------------------------------------
    // if (BebidaId) {
    //     for (let i = 0; i < BebidaId.length; i++) {
    //         const bebida = await Bebida.findByPk(BebidaId[i]);
    //         bebida ? valor += bebida.price * cantidadB[i] : 0;
    //         bebida ? beb = true : false
    //     }
    // }
//----------------------------------------------------------------------
    // if (BebidaId && BebidaId.length > 0) { 
    //     for (const BebidaIds of BebidaId) {

    //         const bebida = await Bebida.findByPk(BebidaIds);
    //        // console.log("----------->",bebida)
    //         bebida ? valor = bebida.price * resultado[contador] : 0;
    //         contador +1

    //     }}

    // if (BebidaId) {
    //     const bebida = await Bebida.findByPk(BebidaId);
    //     beb = bebida ? true: false
    //     bebida ? valor = bebida.price * cantidadbebidas : 0;
    // }


//*------------------------------------------------------------------- */
    // if (MenuId) {
    //     for (let i = 0; i < BebidaId.length; i++) {
    //         const comida = await Bebida.findByPk(BebidaId[i]);
    //         comida ? valor2 = comida.price * cantidadP[i] : 0;
    //         comida ? com = true : false
    //     }
    // }
    //--------------------------------------------------------------------------
    //     if (MenuId) {
    //     const comida = await Bebida.findByPk(MenuId);
    //     com = comida ? true: false
    //     comida ? valor = comida.price * cantidadplatos : 0;
    // }



    subtotal = valor + valor2
  
    const orden = await Ordenes.create({
        mesa, cantidadbebidas: JSON.stringify(cantidadbebidas), cantidadplatos: JSON.stringify(cantidadplatos), total: subtotal, ClienteId, EmpleadoId
    });

    beb === true ? await orden.setBebidas(BebidaId) : await orden.setBebidas(null)
    com === true ? await orden.setMenus(MenuId) : await orden.setMenus(null)

    return orden
}


module.exports = {
    create,
    all,
}