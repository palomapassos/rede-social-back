const jwt = require("jsonwebtoken");

exports.generateToken = (userJson, tokenConfig) => {
    const token = jwt.sign(userJson, process.env.TOKEN_SIGNATURE, tokenConfig);
        
    return token;
}