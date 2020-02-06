const model = require("../models/models");
const seq = require('sequelize');


module.exports= {
    DESCENTE: {
        missions: (_,context,resolveInfo)=>{
           return model.mission.findAll({ where: { IdDescente: _.IdDescente} });
        }
    },
    MISSION: {
        lieu: (_,context,resolveInfo)=>{
           return model.lieu.findOne({ where: { IdLieu: _.IdLieu} });
        },
        descente: (_,context,resolveInfo)=>{
            return model.descente.findOne({ where: { IdDescente: _.IdDescente} });
        }
    },
    LIEU: {
        missions: (_,context,resolveInfo)=>{
            return model.mission.findAll({ where: { IdLieu: _.IdLieu} });
        },
        
    },
    AUTHPAYLOAD: {
        user: async (_,context,resolveInfo)=>{
            
            let usr = null;            
            
            if (_.group=="CHERCHEUR")
            {
                usr = await model.chercheur.findByPk( _.user.IdPersonne);

                return {
                    group:_.group,
                    IdPersonne: usr.IdPersonne

                };
            }
            else if  (_.group=="ENQUETEUR")
            {
                usr = await model.enqueteur.findByPk( _.user.IdPersonne);
                return {
                    group:_.group,
                    IdPersonne: usr.IdPersonne
                };
            }
            else if  (_.group=="SAISISSEUR")
            {
                usr = await model.saisisseur.findByPk( _.user.IdPersonne);
                return {
                    group:_.group,
                    IdPersonne: usr.IdPersonne
                };
            }

            return null;      
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
