const mongoose = require("mongoose");

const rolSchema = mongoose.Schema({
    name: String,
    Date: {type:Date, default: Date.now},
    status: {type:Boolean, default: true}
})

const Rol = mongoose.model("roles", rolSchema);

module.exports = Rol;