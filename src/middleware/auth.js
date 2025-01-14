import { verifyToken } from "../lib/jwt.js";

export const auth = (requiredRole) => {
    return async(request, response, next) => {

        // Existencia del token ===================================
        let token = request.headers["authorization"];
        // console.log("Token obtenido de la cabecera: " + token);
        
        if (!token){
            return response .status(401).json({
                "mensaje": "No se encontro token, permiso denegado"
            });
        }

        // Que el token sea permitido y solo escoja solamente el token y no el bearer
        token = token.split(" ")[1];

        try{
            const decoded = await verifyToken(token);
            // console.log("token decodificado: ", decoded);

            // Esto es para verificar el rol
            if (requiredRole === "admin" && !decoded.isAdmin ){
                return response.status(403).json({
                    "mensaje": "EYYYY!!! Acceso no permitido, no eres administrador"
                });
            }
            request.user = decoded; 

        }catch(error) {

            return response.status(400).json({
                "mensaje": "Fallo la autenticacion del token",
                "problema": error.message || error
            });
        }
        
        // Para que pueda continuar con los siguientes procesos y no se quede en uno no mas
        next();
    } 
}