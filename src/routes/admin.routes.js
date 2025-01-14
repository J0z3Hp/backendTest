import { createAdmin, showAdmin } from "../controllers/admin.controller.js";
import express from "express";
import { auth } from "../middleware/auth.js";

//Configuración del router
export const adminRouter = express.Router();

// Creación de ruta para las peticiones de admin

adminRouter.post("/crear",auth("admin"), createAdmin);
adminRouter.get("/obtener",auth("admin"), showAdmin);

