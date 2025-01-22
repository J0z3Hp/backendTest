import supertest from "supertest";
import mongoose from "mongoose";
import app from "../app.js";
import { productModel } from "../src/models/product.model.js";

describe("Pruebas de los controladores de los productos", () => {

    beforeEach(async () => {
        await productModel.deleteMany({}); // Con esto borramos todo lo de la DB
    });

    afterAll(async () => {
        await mongoose.connection.close(); // Despues de todas la pruebas cerrar la conexioncon la DB
    });

    const productTest = {
        "image": "iou1h43ilhj1gb4oñj1h41ui4",
        "name": "productoTest",
        "price": "60000"
    }

    describe("Pruebas POST", () => {
        // Primer caso de prueba
        it("Deberia crear un producto, correctamente", async () => {
            const res = await supertest(app).post("/productos/crear").send(productTest);
            expect(res.statusCode).toBe(201);
        });

        // Segundo caso de prueba
        it("Deberia devolver un error si falta un campo obligatorio", async () => {
            const res = await supertest(app).post("/productos/crear").send({"name": productTest.name, "price": productTest.price});
            expect(res.body).toHaveProperty("mensaje", "Ocurrio un error al crear una camiseta :(");
        });
    });

    describe("Pruebas GET", () => {
        it("Deberia decir que no hay productos almacenados", async () => {
            const res = await supertest(app).get("/productos/obtener");
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty("mensaje", "No se encontraron camisetas en la base de datos");
        });
    });
});