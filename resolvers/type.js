const model = require("../models/models");
const seq = require('sequelize');


module.exports= {
    DESCENTE: {
        missions: async (_,args,context)=>{
           return await model.mission.findAll({ 
                raw:true,
                where: { IdDescente: _.IdDescente} });
        }
    },

    MISSION: {
        lieu: async (_,args,context)=>{
            let res= await model.lieu.findOne({
                    raw:true,
                    where: { IdLieu: _.IdLieu}, attributes: [["descriLieu","district"],["IdLieu", "IdDistrict"], "IdLieu", "IdRegion"]  });
            console.log(res);
            
            return res;
        },
        descente: async (_,context,resolveInfo)=>{
            return await model.descente.findOne({ raw:true, where: { IdDescente: _.IdDescente} });
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
                    IdLieu: _.IdRegion,
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

            usr = await context.database.query("SELECT *, \""+_.groupe+"\" AS groupe FROM "+_.groupe.toLowerCase()+" as us INNER JOIN fofifapers as ffp ON ffp.IdPersonne=us.IdPersonne WHERE us.IdPersonne = :idp",{
                replacements: { idp: _.user.IdPersonne}, type: seq.QueryTypes.SELECT
            });

            
            return {
                groupe: _.groupe,
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

        details_personne: async (_,args,context) =>{
            return await model.personne.findByPk(_.IdPersonne);
        },
        descentes: async (_,args,context) =>{

            let res= await context.database.query(`
            SELECT des.* FROM affecter 
            INNER JOIN descente as des ON des.IdDescente= affecter.IdDescente WHERE affecter.IdPersonne = :idp `,{
                replacements: {idp: _.IdPersonne}, type: seq.QueryTypes.SELECT
            });

            return res;
        },
    },
  
};
