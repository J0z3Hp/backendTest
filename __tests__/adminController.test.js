import supertest from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import { adminModel } from "../src/models/admin.model.js";

describe("Pruebas de los controladores de los admins", () => {

    beforeEach(async () => {
        await adminModel.deleteMany({}); // Con esto borramos todo lo de la DB
    });

    afterAll(async () => {
        await mongoose.connection.close(); // Despues de todas la pruebas cerrar la conexioncon la DB
    });

    const adminTest = {
        "name": "jhon salchichon",
        "email": "jhon@gmail.com",
        "password": "1234"
    }

    describe("Pruebas POST", () => {
        // Primer caso de prueba
        it("Deberia crear un admin, correctamente", async () => {
            const res = await supertest(app).post("/administradores/crear").send(adminTest);
            expect(res.statusCode).toBe(201);
        });

        // Segundo caso de prueba
        it("Deberia devolver un error si falta un campo obligatorio", async () => {
            const res = await supertest(app).post("/administradores/crear").send({"name": adminTest.email, "price": adminTest.password});
            expect(res.body).toHaveProperty("mensaje", "Error en la creación de administrador");
        });
    });

    describe("Pruebas GET", () => {
        it("Deberia decir que no hay productos almacenados", async () => {
            const res = await supertest(app).get("/administradores/obtener");
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("mensaje", "No hay administradores almacenados aún");
        });
    });
});