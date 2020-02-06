const cnts = require("../config/constants");
const model = require("../models/models");


module.exports= {
    USER: {
        __resolveType (obj){
            return obj.group;
        },

        details_personne: (_,args,context) =>{
            return model.personne.findByPk(_.IdPersonne);
        }
    },

    CHERCHEUR: {

        details_personne: (_,args,context) =>{
            return model.personne.findByPk(_.IdPersonne);
        }
    },

};
