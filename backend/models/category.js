const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: String,
    Date: {type:Date, default: Date.now},
    status: {type:Boolean, default: true}
})

const Category = mongoose.model("categories", categorySchema);

module.exports = Category;