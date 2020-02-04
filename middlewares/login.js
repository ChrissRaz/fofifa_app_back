let jwt = require("jsonwebtoken");
const {crypt_salt} = require("../config/constants");

module.exports =  (req, res, next) => {
    // let auth = {
    //     connected: true,
    //     userInfo: null
    // }; 

    // let authHeader =false;

    // let decodedToken = null;

    // if (!authHeader)
    // {
    //     auth.connected=false;
    //     req.auth = auth;
    //     console.log("tssiiiiiiiaaa");
        
    //     next();
    // }

    // const token = authHeader.split(' ')[1];

    // if (!token || token=='')
    // {
    //     auth.connected=false;
    //     req.auth = auth;
    //     next();
    // }

    // try {
    //     decodedToken = jwt.verify(token,crypt_salt);
    // } catch (error) {
        
    // }

    // if (!decodedToken)
    // {
    //     auth.connected=false;
    //     req.auth = auth;
    //     next();
    // }
    
    // auth.connected=true;
    // auth.userInfo = decodedToken;

    // req.auth = auth;
    
    next();
};