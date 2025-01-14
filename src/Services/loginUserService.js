import { userModel } from "../models/user.model.js";
import { generateToken } from "../lib/jwt.js";
import bcrypt from "bcryptjs";


export const loginUser = async(request, response) => {

    try {
        const {emailLoginUser, passwordLoginUser} = request.body;

        // CORREO===============================================================
        const userFound = await userModel.findOne({
            "email": emailLoginUser
        });

        if(!userFound){
            return response.status(404).json({
                "mensaje": "El usuario no se encontro, por favor registrese"
            });
        }

        // CONTRASEÑA==========================================
        const isValidePasswordUser = await bcrypt.compare(passwordLoginUser, userFound.password);
        if(!isValidePasswordUser){
            return response.status(401).json({
                "mensaje": "La contraseña es incorrecta pruba otra vez"
            });
        }

        // VERIFICAR LOS PERMISOS================================================
        // Creo esta const para en el tocken tenga esta informacion del usuario
        const payload = {
            "id": userFound._id,
            "name": userFound.fullName
        }

        // CREACION DEL TOKEN====================================================
        const token = await generateToken(payload);
        return response.status(200).json({
            "mensaje": "Inicio de sesion exitoso",
            "tokenGenerado": token 
        });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "UPS!!! Paso algo al iniciar sesión",
            "error": error.message || error
        });
    }
}