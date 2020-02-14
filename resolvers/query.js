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

    users: async (_, args, context) => {

        let chercheurs = await model.chercheur.findAll();
        let enqueteur = await model.enqueteur.findAll();
        let saisisseur = await model.saisisseur.findAll();        

        let res = [];

        chercheurs.forEach(el => {
            res.push({
                IdPersonne: el.IdPersonne,group: "CHERCHEUR"
            });
        });

        enqueteur.forEach(el => {
            res.push({
                IdPersonne: el.IdPersonne,group: "ENQUETEUR"
            });
        });

        saisisseur.forEach(el => {
            res.push({
                IdPersonne: el.IdPersonne,group: "SAISISSEUR"
            });
        });
        
        return res;
    },

    user: async (_, args, context) => {

        let res = null;

        if (args.group=="CHERCHEUR")
        {
            let user = await model.chercheur.findByPk(args.IdUser);

            if (user)
            {
                res = {
                    group: args.group,
                    IdPersonne: user.IdPersonne
                };
            }
            else
            {
                throw Error("Utilisateur non existant");
            }
        }
        else if (args.group=="ENQUETEUR")
        {
            let user = await model.enqueteur.findByPk(args.IdUser);
            if (user)
            {
                res = {
                    group: args.group,
                    IdPersonne: user.IdPersonne
                };
            }
            else
            {
                throw Error("Utilisateur non existant");
            }
        }
        else if (args.group=="SAISISSEUR")
        {
            let user = await model.saisisseur.findByPk(args.IdUser);
            if (user)
            {
                res = {
                    group: args.group,
                    IdPersonne: user.IdPersonne
                };
            }
            else
            {
                throw Error("Utilisateur non existant");
            }
        }
        
        console.log(res);
        
        return res;
    },

    availableEnqueteurForDescente: async (_, args, context) => {

        let res = await context.database.query("SELECT * FROM mission AS ms INNER JOIN descente as des ON ms.IdDescente=des.IdDescente INNER JOIN charger ch ON ch.IdMission=ms.IdMission RIGHT JOIN enqueteur AS enq ON enq.IdPersonne=ch.IdPersonne WHERE des.IdDescente=:idd AND ch.IdMission=NULL ",{
            replacements: { idd: args.IdDescente}, type: seq.QueryTypes.SELECT
        });

        return res;
    },


    descentes: async (_, args, context) => {
        console.log(args);
        
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

    missions: async (_,args, context) => {

        let filter = {};

        if (args.IdDescente)
        {
            filter.IdDescente = args.IdDescente;
        }

        return await model.mission.findAll({
            where:  filter
        });
    },

    mission: (_,args, context) => {
        return model.mission.findByPk(args.IdMission);
    },

};