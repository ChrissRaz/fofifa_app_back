const model = require("../models/models");

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
};
