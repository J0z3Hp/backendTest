// Aca importamos nuestro modelo para hacer las peticiones https
import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs" 

// Aca solo tendremos dos peticiones una POST y otra GET
// Peticion POST 
export const createUser = async(request, response) => {
    try { 
        const {fullName, email, password} = request.body;

        const codedPassword = await bcrypt.hash(password, 10);
        
        const newUser = await userModel.create({
            fullName,
            email,
            password: codedPassword,
        });

        return response.status(201).json({
            "mensaje": "Usuario creado correctamente",
            "datos": newUser
        });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrio un error al crear un usuario",
            "problema": error || error.message
        });
    }
};

// Peticion GET 
export const showUsers = async (request, response) => {
    try {
        let users = await userModel.find();
        if(users.length === 0){
            return response.status(200).json({
                "mensaje": "No hay usuarios almacenados"
            });
        }

        return response.status(201).json({
            "mensaje": "Se encontraron ususarios almacenados",
            "numeroUsuarios": users.length,
            "nombre1": users[0].fullName,
            "datos": users
        });
        

    } catch (error) {
        return response.status(400).json({
            "mensaje": "Ocurrio un error al mostrar los usuario",
            "problema": error || error.message
        });
    }
};