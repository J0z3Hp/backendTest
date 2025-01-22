import express from "express";
import dotenv from "dotenv"; 
// Importamos todas nuestras funciones
import { connectionMongo } from "./src/config/dataBase.js"; 
import { productRouter } from "./src/routes/product.routes.js";
import { usersRouter } from "./src/routes/user.routes.js";
import { loginUserRouter } from "./src/routes/loginUser.routes.js";
import { adminRouter } from "./src/routes/admin.routes.js";
import { orderRouter } from "./src/routes/orders.routes.js";
import { loginAdminRouter } from "./src/routes/loginAdmin.routes.js";
import cors from "cors"


// Configurar el uso de nuestro servidor 
const app = express();
dotenv.config(); 
connectionMongo (); 
app.use(cors()); 

//RUTAS QUE DEBE UTILIZAR 
app.use(express.json()); 
app.use("/productos", productRouter);
app.use("/usuarios", usersRouter);
app.use("/iniciarSesion", loginUserRouter);
app.use("/administradores", adminRouter);
app.use("/ordenes", orderRouter);
app.use("/inicarSesionAdmin", loginAdminRouter);

export default app;

