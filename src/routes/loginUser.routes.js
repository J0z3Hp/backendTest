import { loginUser } from "../services/loginUserService.js";
import express from "express";

// Configramos el router de express e importamos la dependencia para poder hacerlo
export const loginUserRouter = express.Router();

loginUserRouter.post("/", loginUser)