let jwt = require("jsonwebtoken");
const {sing_scret_key,expiration_login, test} = require("../config/constants");

module.exports =  (req, res, next) => {
    
    let auth = {
        connected: true,
        token: null,
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

    // console.log(token);
    
    delete decodedToken.iat;
    delete decodedToken.exp;

    // console.log(decodedToken);
    

    // let t = jwt.sign(token,sing_scret_key,{
    //     expiresIn: expiration_login
    // });

    // console.log(t);
    

    
    
    auth.connected=true;
    auth.userInfo = decodedToken;
    auth.token = token;
    

    if (test){
        let auth_payloadTest= {
            connected: true,
            token: "test",
            userInfo: {
                IdPersonne: 7,
                groupe: "CHERCHEUR"
            }
        };
        
        //à décommenter après le config des use par défaut
        // req.auth = auth_payloadTest;
        req.auth =auth;
    }
    else
    {
        req.auth =auth;
    }
    
    next();
};