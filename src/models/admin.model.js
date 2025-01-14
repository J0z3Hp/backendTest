// 1. Importar las dependencias 
import mongoose from "mongoose";


// 2. Plantilla de los datos se define como SCHEMA -> esquema de datos que vamos a sollicitar para guardar en la base de datos

const adminSchema = new mongoose.Schema({
    // Este nombre lo eleguimos nosotros sin caracteres especiales, son caracteristicas de la informacion que queremos guardar, el requiered -> para que sea obligatorio poner una imaguen o lo que queramos poner obligatorio, el type(tipo de dato) siempre es obligatorio, hay type Date(para fechas)
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profileImage: {type: String}
});

// 3. Decirle ala base de datos que cree una coleccón con el esquema anterior
// El primer parametro, es el nombre de la colección
// El segundo parametro, es la estructara de datos 
export const adminModel = mongoose.model("admin", adminSchema);