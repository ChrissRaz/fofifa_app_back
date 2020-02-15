let jwt = require("jsonwebtoken");
const {sing_scret_key} = require("../config/constants");

module.exports =  (req, res, next) => {
    
    let auth = {
        connected: true,
        userInfo: null
    }; 

    // req.test="fqjlkqjlfkqjlfkjq";

    let authHeader = req.get('Authorization');


    // console.log(typeof authHeader);
    
    let decodedToken = null;

    if (!authHeader)
    {
        auth.connected=false;
        req.auth = auth;
        next();
        return;
    }

    const token = authHeader.split(' ')[1];
    
    if (!token || token=='')
    {
        auth.connected=false;
        req.auth = auth;
        next();
        return;
    }

    try {
        decodedToken = jwt.verify(token,sing_scret_key);
    } catch (error) {
        auth.connected=false;
        req.auth = auth;
        next();
        return;
    }

    if (!decodedToken)
    {
        auth.connected=false;
        req.auth = auth;
        next();
        return;
    }
    
    auth.connected=true;
    auth.userInfo = decodedToken;

    req.auth =auth;
    next();
};