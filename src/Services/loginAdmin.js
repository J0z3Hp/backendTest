import { adminModel } from "../models/admin.model.js";
import { generateToken } from "../lib/jwt.js";
import bcrypt from "bcryptjs";


export async function loginAdmin (request, response){

    try {
        
        const { emailLoginAdmin, passwordLoginAdmin} = request.body;

        const adminFound = await adminModel.findOne({
            email: emailLoginAdmin
        });

        if(!adminFound){
            return response.status(404).json({
                mensaje: "Administrador no encontrado, por favor verifica correo y contraseña"
            });
        }
        
        const isValidPasswordAdmin = await bcrypt.compare(passwordLoginAdmin, adminFound.password);

        if(!isValidPasswordAdmin){
            return response.status(401).json({
                mensaje:"Contraseña incorrecta, ingreso no autorizado"
            });
        }

        const payload = {
            id: adminFound._id,
            name: adminFound.name,
            isAdmin: true
        }

        
        const token = await generateToken(payload);

        return response.status(200).json({
            mensaje:"inicio de sesión exitoso",
            tokenGenerado: token
        })
    } catch (error) {
    return response.status(400).json({
        mensaje: "Hubo un error al iniciar sesión",
        error: error.message || error
    });
    }
}