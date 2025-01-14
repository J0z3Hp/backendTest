// Importamos el modelo creado para administrador

import { adminModel } from "../models/admin.model.js";
// Para el modelo de administrador se requiere el uso de contraseña por lo cual importaremos la dependencia para encriptar
import bcrypt from "bcryptjs";


//Vamos a crear petición para crear administrador 
export const createAdmin = async (req, res) => {

    //Siempre debemos tener en cuenta el manejo de errores

    try {

        // Vamos a partir en partes dividiendo cada una de las variables suministradas por el usuario

        const {name, email, password, profileImagen} = req.body;

        //Procedemos a encriptar la contraseña usanto el metodo .hash

        const codedPasswordAdmin = await bcrypt.hash(password, 10);

        const newAdmin = await adminModel.create({
            name,
            email,
            password: codedPasswordAdmin,
            profileImagen
        });

        // Arroje un mensaje de ación realizada correctamente
        return res.status(201).json({
            mensaje: 'Usuario de administrador creado correctamente',
            datos: newAdmin
        });
        
    } catch (error) {
        return res.status(400).json({
            mensaje:'Error en la creación de administrador',
            problema: error || error.message
        });
    }

}

//FIN PETICIÓN DE CREACIÓN DE ADMINISTRADOR

// Inicio de creación de petición de mostrar administradores

export const showAdmin = async (req, res) => {

    try {
        const admins = await adminModel.find();

        if(admins.length === 0){
            return res.status(200).json({
                mensaje: "No hay administradores almacenados aún"
            })
        }

        return res.status(200).json({
            mensaje: "Se encontraron usuarios almacenados",
            numeroAdmin: admins.length,
            datos: admins
        });

    } catch (error) {
        return res.status(400).json({
            mensaje: 'Ocurrio un error al mostrar administradores',
            problema: error || error.message
        });
    }

}