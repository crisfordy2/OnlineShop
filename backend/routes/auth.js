const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.post("/login", async(req, res)=>{

    if(!req.body.email || !req.body.password) return res.status(401).send("Imcomplete data")

    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(401).send("Email o password incorrect")

    const hash = await bcrypt.compare(req.body.password, user.password);
    if(!hash) return res.status(401).send("Email o password incorrect")

    try {
        const token = await user.generateJWT();
        return res.status(200).send({token});
        
    } catch (error) {
        return res.status(401).send("Invalid token");
    }

})

module.exports = router;
