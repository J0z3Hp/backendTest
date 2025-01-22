import { createUser, showUsers } from "../controllers/user.controller.js";
import express from "express";
import { auth } from "../middleware/auth.js";

export const usersRouter = express.Router();

// Ruta para post
usersRouter.post("/crear", createUser);

// Ruta para get
usersRouter.get("/obtener", showUsers);