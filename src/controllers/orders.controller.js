import { ordersModel } from "../models/orders.model.js";


export const createOrder = async (req, res) => {

    try {

        const { products, user, date, totalPrice} = req.body;

        const newOrder = await ordersModel.create({
            products,
            user,
            date,
            totalPrice
        });

        return res.status(201).json({
            mensaje: "Orden creada correctamente",
            datos: newOrder
        });
        
    } catch (error) {
        return res.status(400).json({
            mensaje: "Ouch ! algo salio mal con la creación de la orden, porfavor intentalo de nuevo",
            problema: error || error.message
        });
        
    }
}
//FIN DE LA PETICIÓN DE CREACIÓN DE ORDEN

///INICIO DE LA PETICIÓN CONSULTAR ORDEN

export const showOrderById = async (req, res) => {

    try {

        let idShowOrder = req.params.id;

        let orders = await ordersModel.findById(idShowOrder);

        if(!orders){
            return res.status(404).json({
                mensaje: "La orden consultada no existe, verifica que el id sea el correcto"
            });
        }

        return res.status(200).json({
            mensaje: "Se encontraron las ordenes generadas",
            numeroOrders: orders.length,
            datos: orders
        });

    } catch (error) {
        return res.status(400).json({
            mensaje: "Ocurrio un error al mostrar ordenes generadas",
            problema: error || error. message
        });
    }

}

//FIN PETICIÓN DE MOSTRAR ORDENES

//INICIO DE PETICIÓN DE ACTUALIZACIÓN DE ORDEN MEDIANTE ID

export const updatedOrder = async (request, response) => {

    try {
        let idUpdateOrder = request.params.id;
        let dataForUpdate = request.body;

        const orderUpdate = await ordersModel.findByIdAndUpdate(idUpdateOrder, dataForUpdate);

        if (!orderUpdate){
            return response.status(404).json({
                mensaje:"No se encontro la orden con el id ingresado"
            });
        }

        return response.status(200).json({
            mensaje: "Se actualizo la orden correctamente",
            datos: orderUpdate
        });

    } catch (error) {
        return response.status(400).json({
            mensaje: "Ocurrio un error en la actualización de la orden",
            error: error || error.message
        });
    }
}