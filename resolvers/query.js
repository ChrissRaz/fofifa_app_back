const db_connect = require("../helpers/db");
const {sing_scret_key,expiration_login} = require("../config/constants");

const seq = require('sequelize');

const model = require("../models/models");

const joinMonster = require('join-monster');

let bcrypt = require('bcryptjs');
let jwt = require("jsonwebtoken");





module.exports = {

    login: async (_, args, context) => {
        
        let res = {
            token: null,
            group: null,
            expiration: expiration_login
        };

        let group = null;
        

        let usr = await model.fofifapers.findOne({
            where: {username:  args.username}
        });

        let usr_copy = usr;
    
        if (!usr)
        {
            throw new Error("User not exist");
        }
        else
        {
            let idUser = usr_copy.IdPersonne;
            usr=await model.chercheur.findByPk(idUser);
            
            if (usr)
            {
                group = "CHERCHEUR";
            }
            else
            {
                usr=await model.enqueteur.findByPk(idUser);

                if (usr)
                {
                    group = "ENQUETEUR";
                }
                else
                {
                    usr=await model.saisisseur.findByPk(idUser);

                    if(user)
                    {
                        group = "SAISISSEUR";
                    }
                    else
                    {
                        throw new Error("User not exist");
                    }
                }
            }
        }
    
        const valid = await bcrypt.compare(args.password, usr_copy.password);
    
        if (!valid)
        {
            throw new Error("Password Invalid");
        }
        else
        {
            res.group=group;
            
            res.token = jwt.sign({userId: usr_copy.IdPersonne,usenrame: usr_copy.username,group:group},sing_scret_key);


            
            res = {...res,user: usr};
            // console.log(res);
            
            return res;
        }
        
    },

    descentes: async (_, args, context) => {
        return model.descente.findAll();
    },

    descente: async (_, args, context) => {
        return model.descente.findByPk(args.IdDescente);
    },
    lieux: (_, args, context) => {
        return model.lieu.findAll();
    },
    lieu: (_, args, context) => {
        return model.lieu.findByPk(args.IdLieu);
    },
    missions: (_,args, context) => {
        return model.mission.findAll();
    },
    mission: (_,args, context) => {
        return model.mission.findByPk(args.IdMission);
    },

};