const db_connect = require("../helpers/db");
const {sing_scret_key,expiration_login} = require("../config/constants");
const msg = require("../config/messages");


const seq = require('sequelize');

const model = require("../models/models");

const joinMonster = require('join-monster');

let bcrypt = require('bcryptjs');
let jwt = require("jsonwebtoken");

const Sequelize = require('sequelize');

const Op = Sequelize.Op;


module.exports = {

    login: async (_, args, context) => {
        
        let res = {
            token: null,
            groupe: null,
            expiration: expiration_login
        };

        let groupe = null;
        
        //récupération de l'info client correspondant
        let usr = await model.fofifapers.findOne({
            where: {username:  args.username}
        });

        let usr_copy = usr;
    
        if (!usr)
        {
            throw new Error(msg.userNotExist);
        }
        else
        {
            // vérification du groupe de la personne correspondante
            let idUser = usr_copy.IdPersonne;
            usr=await model.chercheur.findByPk(idUser);
            
            if (usr)
            {
                groupe = "CHERCHEUR";
            }
            else
            {
                usr=await model.enqueteur.findByPk(idUser);

                if (usr)
                {
                    groupe = "ENQUETEUR";
                }
                else
                {
                    usr=await model.saisisseur.findByPk(idUser);

                    if(user)
                    {
                        groupe = "SAISISSEUR";
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
            throw new Error(msg.passwordInvalid);
        }
        else
        {
            res.groupe=groupe;
            
            res.token = jwt.sign({IdPersonne: usr_copy.IdPersonne,usenrame: usr_copy.username,groupe:groupe},sing_scret_key,{
                expiresIn: expiration_login
            });
            
            res = {...res,user: usr};
            
            return res;
        }
        
    },

    checkConnexion: async (_, args, context) => {
    
        let auth = context.req.auth;

        console.log(auth);
        
        if (!auth.connected)
        {
            return null;
        }

        let res = {token: auth.token, groupe: auth.userInfo.groupe,expiration: expiration_login,user: auth.userInfo, IdPersonne: auth.userInfo.IdUser};
            
        return res;
    
    },
    
    users: async (_, args, context) => {

        if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        if (context.req.auth.userInfo.groupe!="CHERCHEUR")
        {
            throw  new Error(msg.notAllowedApi);
        }

        let chercheurs  = await context.database.query("SELECT *, 'CHERCHEUR' AS groupe FROM chercheur as us INNER JOIN fofifapers as ffp ON ffp.IdPersonne=us.IdPersonne",{
            type: seq.QueryTypes.SELECT
        });

        let enqueteur =  await context.database.query("SELECT *, 'ENQUETEUR' AS groupe FROM enqueteur as us INNER JOIN fofifapers as ffp ON ffp.IdPersonne=us.IdPersonne",{
            type: seq.QueryTypes.SELECT
        });
        let saisisseur = await context.database.query("SELECT *, 'SAISISSEUR' AS groupe FROM saisisseur as us INNER JOIN fofifapers as ffp ON ffp.IdPersonne=us.IdPersonne",{
            type: seq.QueryTypes.SELECT
        });       

        let res = [...chercheurs,...enqueteur,...saisisseur];
        
        return res;
    },

    user: async (_, args, context) => {

        let res = await context.database.query("SELECT *, \""+args.groupe+"\" AS groupe FROM "+args.groupe.toLowerCase()+" as us INNER JOIN fofifapers as ffp ON ffp.IdPersonne=us.IdPersonne WHERE us.IdPersonne = :idp",{
            replacements: { idp: args.IdUser}, type: seq.QueryTypes.SELECT
        });

        if (res.length==0)
        {
            throw Error(msg.userNotExist);
        }
        
        return res[0];
    },

    availableEnqueteurForDescente: async (_, args, context) => {

        if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        if (context.req.auth.userInfo.groupe!="CHERCHEUR")
        {
            throw  new Error(msg.notAllowedApi);
        }

        let res = await context.database.query(`SELECT * FROM enqueteur WHERE IdPersonne NOT IN 
        (SELECT enq.IdPersonne FROM descente as des 
            INNER JOIN mission as miss ON miss.IdDescente = des.IdDescente 
            INNER JOIN lieu as li ON li.IdLieu=miss.IdLieu
            INNER JOIN charger as ch ON ch.IdMission = miss.IdMission 
            INNER JOIN enqueteur as enq  ON enq.IdPersonne= ch.IdPersonne 
            WHERE des.IdDescente = :idd AND li.IdLieu !=:idl )`,{
            replacements: { idd: args.IdDescente, idl: args.IdDistrict}, type: seq.QueryTypes.SELECT
        });

        return res;
    },

    descentes: async (_, args, context) => {
        if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        
        if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }
        
        let res = await model.descente.findAll();
        
        return res;
    },

    descente: async (_, args, context) => {
        if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }
        let res = await model.descente.findByPk(args.IdDescente);
  
        return res;
    },

    regions: async (_, args, context) => {
        if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        let res = await model.lieu.findAll({
            raw: true,
            where: {
                IdRegion: {
                    [Op.is]: null
                  }
            },
            attributes: [ ['IdLieu', 'IdRegion'], ["descriLieu", "region"]] 
        });

        console.log(res);
        
        return res;
    },

    regionsWithAvailableDistrictForDescente: async (_, args, context) => {
        if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        //à reviser SELECT * FROM lieu as dist INNER JOIN lieu as reg ON reg.IdLieu = dist.IdRegion LEFT JOIN mission as miss ON miss.IdLieu = dist.IdLieu LEFT JOIN descente as dst ON dst.IdDescente =miss.IdDescente WHERE miss.IdMission <=> NULL AND reg.IdRegion = 1
        let res =  await context.database.query(``,{
            replacements: { }, type: seq.QueryTypes.SELECT
        }); 
        
        return res;
    },

    region: async (_, args, context) => {
        if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        return await model.lieu.findOne({
            raw: true,
            where:{
                IdLieu: args.IdRegion,
                IdRegion: {
                    [Op.is]: null
                },
            },
            attributes: [ ['IdLieu', 'IdRegion'], ["descriLieu", "region"]] 
        });
    },

    missions: async (_,args, context) => {

        if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        if (context.req.auth.userInfo.groupe!="CHERCHEUR" && context.req.auth.userInfo.groupe!="ENQUETEUR")
        {
            throw  new Error(msg.notAllowedApi);
        }

        let filter = {};

        if (args.IdDescente)
        {
            filter.IdDescente = args.IdDescente;
        }

        return await model.mission.findAll({
            where:  filter,
            attributes: [ ['IdLieu', 'IdDistrict'], "commune","fokotany","village","IdDescente","IdMission", "IdLieu"] 
        });
    },

    mission: async (_,args, context) => {
        if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        if (context.req.auth.userInfo.groupe!="CHERCHEUR" && context.req.auth.userInfo.groupe!="ENQUETEUR")
        {
            throw  new Error(msg.notAllowedApi);
        }

        return await model.mission.findByPk(args.IdMission);
    },

};