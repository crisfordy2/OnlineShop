const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: String,
    price: Number,    
    idProvider: {type: mongoose.Schema.ObjectId, ref: "users"},
    idCategory: {type: mongoose.Schema.ObjectId, ref: "categories"},
    Date: {type:Date, default: Date.now},
    status: {type:Boolean, default: true}
})

const Product = mongoose.model("products", productSchema);

module.exports = Product;
