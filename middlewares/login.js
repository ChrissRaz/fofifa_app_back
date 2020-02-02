module.exports =  (req, res, next) => {
    let auth = {
        conneced: true,
        group: 1,
        test:" fqkmfdjkqjd"
    };

    
    req.auth = auth;
    
    next();
};