import mongoose from "mongoose";

// Creamos una función para concetar la base de datos
export async function connectionMongo(){

    try {
        // Concectar base de datos 
        await mongoose.connect(process.env.DB_URL,{});
        console.log("Conexion exitosa con la base de datos");
    } catch (error) {
        console.error("Un error de conexion: " + error); 
    }
}