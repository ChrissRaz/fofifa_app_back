let jwt = require("jsonwebtoken");
const { sing_scret_key, expiration_login, dev } = require("../config/constants");

module.exports = (req, res, next) => {

    let auth = {
        connected: true,
        token: null,
        userInfo: null
    };

    if (dev) {

        auth.token = "test";
        auth.userInfo = {
            IdPersonne: 1,
            groupe: "CHERCHEUR"
        };
        auth.connected = true;


        // let auth_payloadTest = {
        //     connected: true,
        //     token: "test",
        //     userInfo: {
        //         IdPersonne: 1,
        //         groupe: "CHERCHEUR"
        //     }
        // };

        req.auth = auth;

        next();
        return;

    }

    // req.test="fqjlkqjlfkqjlfkjq";

    let authHeader = req.get('Authorization');


    // console.log(typeof authHeader);

    let decodedToken = null;

    if (!authHeader) {
        auth.connected = false;
        req.auth = auth;
        next();
        return;
    }

    const token = authHeader.split(' ')[1];

    if (!token || token == '') {
        auth.connected = false;
        req.auth = auth;
        next();
        return;
    }

    try {
        decodedToken = jwt.verify(token, sing_scret_key);
    } catch (error) {
        auth.connected = false;
        req.auth = auth;
        next();
        return;
    }

    if (!decodedToken) {
        auth.connected = false;
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


    auth.connected = true;
    auth.userInfo = decodedToken;
    auth.token = token;


    req.auth = auth;

    next();
};