const mongoose = require("mongoose");
const moment = require("moment");
const jsonwebtoken = require("jsonwebtoken");

const userSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    idRol: {type: mongoose.Schema.ObjectId, ref: "roles"},
    Date: {type:Date, default: Date.now},
    status: {type:Boolean, default: true}
})

userSchema.methods.generateJWT = function (){
    return jsonwebtoken.sign({
        _id: this._id,
        fullName: this.fullName,
        idRol: this.idRol,
        iat: moment().unix(),
    },
    process.env.SECRET_kEY_JWT
    );
};

const User = mongoose.model("users", userSchema);

module.exports = User;
