import { getProduct, postProduct, putProductById, deleteProductById } from "../controllers/product.controller.js";
import express from "express"; 
import { auth } from "../middleware/auth.js";

export const productRouter = express.Router();

// Ruta para la peticion GET 
productRouter.get("/obtener", getProduct);

// Ruta para la peticion POST 
productRouter.post("/crear", auth("admin"), postProduct);

// Ruta para la peticion PUT 
productRouter.put("/actualizar/:id",auth("admin"), putProductById);

// Ruta para la peticion DELETE
productRouter.delete("/eliminar/:id",auth("admin"), deleteProductById);