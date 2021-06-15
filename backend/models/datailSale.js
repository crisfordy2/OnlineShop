const mongoose = require("mongoose");

const detailSaleSchema = mongoose.Schema({
    idSale: {type: mongoose.Schema.ObjectId, ref: "sales"},
    idProduct: {type: mongoose.Schema.ObjectId, ref: "products"},
    Date: {type:Date, default: Date.now},
    status: {type:Boolean, default: true}
})

const DetailSale = mongoose.model("detailSales", detailSaleSchema);

module.exports = DetailSale;