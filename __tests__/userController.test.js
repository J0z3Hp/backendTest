import supertest from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import { userModel } from "../src/models/user.model.js";

describe("Pruebas de los controladores de los usuarios", () => {
    beforeEach(async () => {
        await userModel.deleteMany({}); // Para borrar todo lo que hya en la DB
    });

    afterAll(async () => {
        await mongoose.connection.close(); // Despues de todas las pruebas cerrar la conexión a la DB
    });

    const userTest = {
        "fullName": "jhon salchichon",
        "email": "jhon@gmail.com",
        "password": "1234"
    }

    
    describe("Pruebas POST para users", () => {
        // Primer caso de prueba
        it("Deberia crear un usuario, correctamente", async () => {
            const res = await supertest(app).post("/usuarios/crear").send(userTest);

            expect(res.statusCode).toBe(201);
        });

        // Segundo caso de prueba
        it("Deberia devolver un error si falta un campo obligatorio", async () => {
            const res = await supertest(app).post("/usuarios/crear").send({"email": userTest.email});

            expect(res.body).toHaveProperty("mensaje", "Ocurrio un error al crear un usuario"); 
        });
    });

    describe("Pruebas GET", () => {
        // Primer caso de prueba
        it("Deberia indicar que no hay usuarios almacenados", async() => {
            const res = await supertest(app).get("/usuarios/obtener");
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("mensaje", "No hay usuarios almacenados")
        });
    });
});