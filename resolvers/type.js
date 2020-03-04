const model = require("../models/models");
const seq = require('sequelize');

const {param_tabes} = require('../config/constants');




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
            // console.log(res);
            
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

            let res = null;
            // console.log(_);
            

            if (_.IdDescente)
            {
                let query = "";

                if (_.IdDisctrictOfMission)
                {
                    query =`SELECT IdLieu as IdDistrict, descriLieu as district , IdRegion
                    FROM lieu as li WHERE li.IdLieu NOT IN (SELECT dist.IdLieu FROM descente as dst 
                    INNER JOIN mission as miss ON miss.IdDescente= dst.IdDescente
                    INNER JOIN lieu as dist ON dist.IdLieu = miss.IdLieu
                    INNER JOIN lieu as reg ON reg.IdLieu = dist.IdRegion
                    WHERE reg.IdLieu = :idReg AND dst.IdDescente = :iddst  AND dist.IdLieu!=:idl)  AND NOT li.IdRegion <=> NULL AND li.IdRegion =:idReg `;
                }
                else
                {
                    query =`SELECT IdLieu as IdDistrict, descriLieu as district , IdRegion
                    FROM lieu as li WHERE li.IdLieu NOT IN (SELECT dist.IdLieu FROM descente as dst 
                    INNER JOIN mission as miss ON miss.IdDescente= dst.IdDescente
                    INNER JOIN lieu as dist ON dist.IdLieu = miss.IdLieu
                    INNER JOIN lieu as reg ON reg.IdLieu = dist.IdRegion
                    WHERE reg.IdLieu = :idReg AND dst.IdDescente = :iddst)  AND NOT li.IdRegion <=> NULL AND li.IdRegion =:idReg `
                }

                res = await context.database.query(query,{
                        replacements: { iddst: _.IdDescente, idReg: _.IdRegion, idl: _.IdDisctrictOfMission}, 
                        type: seq.QueryTypes.SELECT,
                        attributes: [ ['IdLieu', 'IdDistrict'], ["descriLieu", "district"],"IdRegion"] 
                    });
            }
            else
            {
                res = await  model.lieu.findAll({
                    raw: true,
                    where:{
                        IdRegion: _.IdRegion,
                    },
                    attributes: [ ['IdLieu', 'IdDistrict'], ["descriLieu", "district"],"IdRegion"] 
                });
            }

            return res;
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
    EA: {
        status: async (_,args,context) =>{
            
            return await model.param_divers.findByPk(_.IdStatus,{
                raw: true,
                attributes: ["IdParam",["tableParam","table"],["codeParam", "code"], ["val_param","val"], ["status_param", "status"]],
            });

        },

        meanages:  async (_,args,context) =>{
            
            return await context.database.query(
                `SELECT * FROM ea 
                INNER JOIN avoir_famille AS af ON af.IdEA = ea.IdEA 
                INNER JOIN menage AS mn ON mn.IdPersonne= af.IdPersonne 
                WHERE ea.IdEA = :idea` ,
                {
                    replacements: {
                        idea: _.IdEA
                    },
                    type: seq.QueryTypes.SELECT
                }
            );

        },
    },
    MENAGE: {
        activitePricipale: async (_,args,context) =>{
            
            
            let res =  await model.param_divers.findOne({
                where: {
                    IdParam: _.IdActPcpl,
                    tableParam: param_tabes.activite
                },
                raw: true,
                attributes: ["IdParam",["tableParam","table"],["codeParam", "code"], ["val_param","val"], ["status_param", "status"]],
            });

            // console.log(res);

            return res;
            
        },
        activiteSecondaire: async (_,args,context) =>{
            
            return await model.param_divers.findOne({
                where: {
                    IdParam: _.IdActSec,
                    tableParam: param_tabes.activite
                },
                raw: true,
                attributes: ["IdParam",["tableParam","table"],["codeParam", "code"], ["val_param","val"], ["status_param", "status"]],
            });
        },
        autreSourceRevenu: async (_,args,context) =>{
            
            return await model.param_divers.findOne({
                where: {
                    IdParam: _.IdAutrSrcRev,
                    tableParam: param_tabes.activite
                },
                raw: true,
                attributes: ["IdParam",["tableParam","table"],["codeParam", "code"], ["val_param","val"], ["status_param", "status"]],
            });
        },
        nivScolaireAct: async (_,args,context) =>{
            
            return await model.param_divers.findOne({
                where: {
                    IdParam: _.IdNivAct,
                    tableParam: param_tabes.niv_sco
                },
                raw: true,
                attributes: ["IdParam",["tableParam","table"],["codeParam", "code"], ["val_param","val"], ["status_param", "status"]],
            });
        },
        nivScolaireAtteint: async (_,args,context) =>{
            
            return await model.param_divers.findOne({
                where: {
                    IdParam: _.IdNivAtt,
                    tableParam: param_tabes.niv_sco
                },
                raw: true,
                attributes: ["IdParam",["tableParam","table"],["codeParam", "code"], ["val_param","val"], ["status_param", "status"]],
            });
        },
        relatioAvecCE: async (_,args,context) =>{
            
            //  await model.param_divers.findByPk(_.IdStatus,{
            //     raw: true,
            //     attributes: ["IdParam",["tableParam","table"],["codeParam", "code"], ["val_param","val"], ["status_param", "status"]],
            // });


            let res = await context.database.query(
                `SELECT pd.IdParam, pd.tableParam AS 'table',  pd.codeParam AS code, pd.val_param AS val, pd.status_param AS status  
                FROM param_divers as pd 
                INNER JOIN avoir_famille as af ON af.IdRelaCE = pd.IdParam 
                WHERE af.IdPersonne =  :idp AND af.IdEA= :idEA`,
                {
                    replacements: {
                        idp: _.IdPersonne,
                        idEA: _.IdEA
                    }, type: seq.QueryTypes.SELECT               
                }
            );
                        
            return res[0];

            
        },
        ea: async (_,args,context) =>{
            
            return await model.EA.findOne({
                raw: true,
                where: {
                    IdEA:_.IdEA
                }
            });
        },
        details_personne: async (_,args,context) =>{
            
            return await model.personne.findOne({
                raw: true,
                where: {
                    IdPersonne:_.IdPersonne
                }
            });

        },
    },
};
