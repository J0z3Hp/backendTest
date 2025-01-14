import mongoose from "mongoose";


// Plantilla de los datos se define como SCHEMA -> esquema de datos que vamos a sollicitar para guardar en la base de datos

const ordersSchema = new mongoose.Schema({ 
    // Este nombre lo eleguimos nosotros sin caracteres especiales, son caracteristicas de la informacion que queremos guardar, el requiered -> para que sea obligatorio poner una imaguen o lo que queramos poner obligatorio, el type(tipo de dato) siempre es obligatorio, hay type Date(para fechas)
    products: [{type: mongoose.Schema.Types.ObjectId, ref: "product"}],
    user: {type: mongoose.Schema.Types.ObjectId, ref: "user"},
    date: {type: Date, default: Date.now},
    totalPrice: {type: String, required: true}
});


// 3. Decirle ala base de datos que cree una coleccón con el esquema anterior
// El primer parametro, es el nombre de la colección
// El segundo parametro, es la estructara de datos 
export const ordersModel = mongoose.model("orders", ordersSchema);