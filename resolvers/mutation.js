let jwt = require("jsonwebtoken");
let bcrypt = require('bcryptjs');


const db_connect = require("../helpers/db");

const model = require("../models/models");

class USER {
        constructor(obj) {
            this.group = obj.group;
          }

        __resolveType ({obj}){
            console.log("woooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooork",obj);  
            return obj.group;
        }
    }


module.exports= {
    
    newUser: async (args,context) => {
        
        return new USER({
            group:args.group,
            IdPersonne: 5452
        });   
    },
    UpdateUserInfo: async (parent,args, context) => {

    },
    DeleteUser: async (parent,args, context) => {

    },

    addDescente: async (args,context) =>{
        let added = await model.descente.create({description:args.description,dateDescente:args.dateDescente});
        return added;
    },
    updateDescente: async (parent, args, context) =>{
        
    },
    DeleteDescente: async (parent, args, context) =>{
        
    },

    addLieu: async (args,context) =>{
            
        let added = await model.lieu.create({region:args.region,district:args.district});
        console.log(added);        

        return added;
    },
    updateLieu: async (parent, args, context) =>{
        
    },
    DeleteLieu: async (parent, args, context) =>{
    },
    addMission : async (args,context) => {
        let added = await model.mission.create({commune: args.commune, fokotany: args.fokotany, village: args.village, 
            IdDescente: args.IdDescente, IdLieu: args.IdLieu});
        return added;
    },
};



