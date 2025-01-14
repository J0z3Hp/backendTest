import { loginAdmin } from "../Services/loginAdmin.js";
import express from "express";


export const loginAdminRouter = express.Router();

loginAdminRouter.post("/", loginAdmin)