const model = require("../models/models");
const seq = require('sequelize');


module.exports= {
    DESCENTE: {
        missions: async (_,args,context)=>{
           return await model.mission.findAll({ where: { IdDescente: _.IdDescente} });
        }
    },

    MISSION: {
        lieu: async (_,args,context)=>{
           return await model.lieu.findOne({ where: { IdLieu: _.IdLieu} });
        },
        descente: async (_,context,resolveInfo)=>{
            return await model.descente.findOne({ where: { IdDescente: _.IdDescente} });
        },
        equipe: async (_,args,context)=>{
            let res = await context.database.query("SELECT * FROM mission INNER JOIN charger ON charger.IdMission=mission.IdMission INNER JOIN enqueteur ON enqueteur.IdPersonne=charger.IdPersonne WHERE mission.IdMission=:idm",{
                replacements: { idm: _.IdMission }, type: seq.QueryTypes.SELECT
            });
            return res;
        },
    },

    REGION: {

        districts: async(_,args,context)=>{
            return await  model.lieu.findAll({
                raw: true,
                where:{
                    IdRegion: _.IdRegion,
                },
                attributes: [ ['IdLieu', 'IdDistrict'], ["descriLieu", "district"],"IdRegion"] 
            });
        }
    },

    DISTRICT: {
        missions: async (_,args,context)=>{
            return await model.mission.findAll({ where: { IdLieu: _.IdDistrict} });
        },
    },

    AUTHPAYLOAD: {
        user: async (_,args,context)=>{
            
            let usr = null;            
            
            // if (_.groupe=="CHERCHEUR")
            // {
            //     usr = await model.chercheur.findByPk( _.user.IdPersonne);

            //     return {
            //         groupe:_.groupe,
            //         IdPersonne: usr.IdPersonne
            //     };
            // }
            // else if  (_.groupe=="ENQUETEUR")
            // {
            //     usr = await model.enqueteur.findByPk( _.user.IdPersonne);
            //     return {
            //         groupe:_.groupe,
            //         IdPersonne: usr.IdPersonne
            //     };
            // }
            // else if  (_.groupe=="SAISISSEUR")
            // {
            //     usr = await model.saisisseur.findByPk( _.user.IdPersonne);
            //     return {
            //         groupe:_.groupe,
            //         IdPersonne: usr.IdPersonne
            //     };
            // }

            usr = await context.database.query("SELECT *, \""+_.groupe+"\" AS groupe FROM "+_.groupe+" as us INNER JOIN FOFIFAPERS as ffp ON ffp.IdPersonne=us.IdPersonne WHERE us.IdPersonne = :idp",{
                replacements: { idp: _.user.IdPersonne}, type: seq.QueryTypes.SELECT
            });

            return {
                ...usr[0]
            };     
        },
        
    },

    CHERCHEUR: {
        details_personne: (_,args,context) =>{
            return model.personne.findByPk(_.IdPersonne);
        }
    },

    ENQUETEUR: {

        details_personne: (_,args,context) =>{
            return model.personne.findByPk(_.IdPersonne);
        },
        missions: async (_,args,context) =>{
            let res = await context.database.query("SELECT * FROM mission INNER JOIN charger ON charger.IdMission=mission.IdMission INNER JOIN enqueteur ON enqueteur.IdPersonne=charger.IdPersonne WHERE enqueteur.IdPersonne=:idp",{
                replacements: { idp: _.IdPersonne }, type: seq.QueryTypes.SELECT
            });

            return res;
        },
    },
    
    SAISISSEUR: {

        details_personne: (_,args,context) =>{
            return model.personne.findByPk(_.IdPersonne);
        }
    },
  
};
