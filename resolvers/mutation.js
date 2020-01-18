let jwt = require("jsonwebtoken");
let bcrypt = require('bcryptjs');
const { requestPromise, loadJsonFile } = require("../helpers/helpers");

const db_connect = require("../helpers/db");


const  {tables} = require("../config/database");


module.exports= {
    user:{
        login: async (parent, args, context) =>
        {
            let res = {
                token: -1,
                user: null
            };
        
            let req = "SELECT * FROM "+tables.user+" WHERE username=?";
        
            let usr = requestPromise(db,req,[args.username]);
        
            if (!usr)
            {
                return res;
            }
        
            const valid = await bcrypt.compare(args.password, usr.password);
        
        
            if (!valid)
            {
                res.token=0;
                return res;
            }
            else
            {
                res.user= usr;
                res.token = jwt.sign({userId: usr.IdPersonne,usenrame: usr.username});
        
                return res;
            }
            
        },

        signUser: async (parent,args, context) => {
    
        }
    },

    descente:
    {
        descente: async (parent, args, context) =>
        {
            let  req = "INSERT INTO "+ tables.descente+" (description,dateDescente) VALUES (?,?)";

            
            let res = await requestPromise(db_connect,req,[args.description,args.date]).then(val => {
                    let last = val.insertId;


                    let req = "SELECT * FROM "+tables.descente+ " WHERE IdDescente="+last;

                    console.log(req);
                    return requestPromise(db_connect,req,[args.description,args.date]).then(val => val );
            });

            return res;
            
        }
    }

};



