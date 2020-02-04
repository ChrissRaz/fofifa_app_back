const db_connect = require("../helpers/db");
const {sing_scret_key} = require("../config/constants");

const seq = require('sequelize');

const model = require("../models/models");

const joinMonster = require('join-monster');

let bcrypt = require('bcryptjs');
let jwt = require("jsonwebtoken");





module.exports = {

    login: async (_, args, context) => {
        

        let res = {
            token: null,
            user: null,
            expiration: 3600
        };

        let group = null;
    
        // let usr = await context.database.query('SELECT * FROM fofifapers WHERE username = :un ',{ 

        //         replacements: { un: args.username }, 
        //         type: seq.QueryTypes.SELECT , 
        //         model: context.model.fofifapers, 
        //         plain: true,
        //     }
        // );

        let usr = await model.fofifapers.findOne({
            where: {username:  args.username}
        });

        console.log(usr);
    
        if (!usr)
        {
            throw new Error("User not found");
        }
        else
        {
            if (model.chercheur.findOne({where: {IdPersonne:  usr.IdPersonne}}))
            {
                group = "CHERCHEUR";
            }
            else if (model.enqueteur.findOne({where: {IdPersonne:  usr.IdPersonne}}))
            {
                group = "ENQUETEUR";
            }
            else if (model.saisisseur.findOne({where: {IdPersonne:  usr.IdPersonne}}))
            {
                group = "SAISISSEUR";
            }
        }
    
        const valid = await bcrypt.compare(args.password, usr.password);
    
        if (!valid)
        {
            throw new Error("Password Invalid");
        }

        else
        {
            res.user= usr;
            res.token = jwt.sign({userId: usr.IdPersonne,usenrame: usr.username,group:group},sing_scret_key);
    
            return res;
        }
        

    },

    descentes: async (_, context,resolveInfo) => {
        return model.descente.findAll();
    },

    
    // logout: (parent, args, context) => {

    // },
    // descentes: (parent, args, context) => {
       
    // },
    // descente: (parent, args, context) => {
        
    // },
    lieux: (_,context,resolveInfo) => {
        return model.lieu.findAll();
    },
    // lieu: (parent, args, context) => {
        
    // },
    missions: (_,context,resolveInfo) => {
        return model.mission.findAll();
    },
    // mission: (parent, args, context) => {
        
    // },

};