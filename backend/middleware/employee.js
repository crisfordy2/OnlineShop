const Rol = require("../models/rol");

const Employee = async(req, res, next)=>{    
    
    const employee = await Rol.findOne({_id: req.user.idRol})
    if(!employee) return res.status(401).send("Invalid rol");    

    if(employee.name === "admin" || employee.name === "employee") next();
    else return res.status(401).send("Unauthorized user");
    
}

module.exports = Employee;