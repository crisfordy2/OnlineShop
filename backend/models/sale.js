const mongoose = require("mongoose");

const saleSchema = mongoose.Schema({
    idEmployee: {type: mongoose.Schema.ObjectId, ref: "users"},
    idClient: {type: mongoose.Schema.ObjectId, ref: "users"},
    Date: {type:Date, default: Date.now},
    status: {type:Boolean, default: true}
})

const Sale = mongoose.model("sales", saleSchema);

module.exports = Sale;