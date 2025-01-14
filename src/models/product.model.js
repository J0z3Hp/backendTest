import mongoose from "mongoose";

// SCHEMA de los productos(camisetas)
const productSchema = new mongoose.Schema({
    image:{type: String, required: true},
    name: {type: String, required: true},
    category: {type: String, required: false, enum: ["hombre", "mujer"]},
    color: {type: String, required: false},
    talla: {type: String, required: false},
    price:{type: String, required: true},
    stock: {type: Number, required: false}
});

export const productModel = mongoose.model("product", productSchema);