
const Rol = require("../models/rol");

const Admin = async(req, res, next)=>{    
    
    const admin = await Rol.findOne({_id: req.user.idRol})
    if(!admin) return res.status(401).send("Invalid rol");    

    if(admin.name === "admin") next();
    else return res.status(401).send("Unauthorized user");
    
}

module.exports = Admin;