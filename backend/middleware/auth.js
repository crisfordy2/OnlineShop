const jwt = require("jsonwebtoken");

const Auth = (req, res, next)=>{
    
    let jwtToken = req.header("Authorization");
    if(!jwtToken) return res.status(401).send("dosen't exist token")
    
    jwtToken = jwtToken.split(" ")[1];
    if(!jwtToken) return res.status(401).send("dosen't exist token")    

    try {
        const payload = jwt.verify(jwtToken, process.env.SECRET_kEY_JWT);    
        req.user = payload;        
        next();
        
    } catch (error) {
        return res.status(401).send("invalid token")
    }

}

module.exports = Auth;