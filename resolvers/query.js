const { requestPromise } = require("../helpers/helpers");
const db_connect = require("../helpers/db");
const {crypt_salt,sing_scret_key} = require("../config/constants");

const seq = require('sequelize');

const model = require("../models/models");





module.exports = {

    login: async (parent, args, context) => {

        let res = {
            token: -1,
            user: null
        };
    
        let usr = await context.database.query('SELECT * FROM fofifapers WHERE username = :un ',{ 

                replacements: { un: args.username }, 
                type: seq.QueryTypes.SELECT , 
                model: context.model.fofifapers, 
                plain: true,
            }
        );

        console.log(usr);
    
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
        return 'ceci est juste un test';

    },
    logout: (parent, args, context) => {

    },
    descentes: (parent, args, context) => {
       
    },
    descente: (parent, args, context) => {
        
    },
    lieux: (parent, args, context) => {
        
    },
    lieu: (parent, args, context) => {
        
    },
    missions: (parent, args, context) => {
        
    },
    mission: (parent, args, context) => {
        
    },

};