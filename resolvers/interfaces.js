const cnts = require("../config/constants");
const model = require("../models/models");


module.exports= {
    USER: {
        __resolveType (obj){
            return obj.groupe;
        },

        details_personne: (_,args,context) =>{
            return model.personne.findByPk(_.IdPersonne);
        }
    },


};
