const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyTokenMiddleware = (req, res, next) => {
    const auth = req.headers.authorization;
    let isTokenValid = false;

    if(!auth){
        return res.status(403).send("Você não tem autorização para realizar essa ação.")
    }

    if(auth){
        const token = auth.split(" ")[1];
        isTokenValid = jwt.verify(token, process.env.TOKEN_SIGNATURE, (err) => {
            return !err;
        });
    }

    if(isTokenValid){
        next();
    }else{
        console.log("Token inválido");
        return res.status(400).send("Token inválido.");
    }

}