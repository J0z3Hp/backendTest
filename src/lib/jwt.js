import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Configurar el uso de la clave secreta que esta en .env
const key = process.env.SECRET_KEY;

// Crear las funciones para generar y verificar el token
export const generateToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, key, {expiresIn:"2h"}, (error, token) => {  

            if(error){
                // Esto es por si sale algo mal me de un mensaje con el error
                reject(new Error("UPSS Paso algo al generar JWT " + error.message));
            }else{
                // Esto es por si todo sale bien que me de el token
                resolve(token);
            }
        });
    });
}

// Funcion para verificar que le token sea generado por nuestro servidor y no fue alterado
export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, key, (error, decoded) => {

            if(error){
                reject(new Error("UPSSS!!! Paso algo al verificar JWT " + error.message));
            }else{
                resolve(decoded);
            }
        });
    });
}
