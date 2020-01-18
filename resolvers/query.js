const { requestPromise } = require("../helpers/helpers");
let {tables} = require("../config/database");
const db_connect = require("../helpers/db");


module.exports = {
    descentes: (parent, args, contexte) =>{
        let req = "SELECT * FROM "+tables.descente;
    
        return requestPromise(db_connect,req).then((val) =>  val);
    },

    descente: (parent, args, contexte) =>{
        let req = "SELECT * FROM "+tables.descente+ " WHERE IdDescente=?";
        return requestPromise(db_connect,req, [args.id]).then((val) =>  val[0]);
    }
};