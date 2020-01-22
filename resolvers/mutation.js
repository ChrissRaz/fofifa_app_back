let jwt = require("jsonwebtoken");
let bcrypt = require('bcryptjs');
const { requestPromise, loadJsonFile } = require("../helpers/helpers");

const db_connect = require("../helpers/db");

const model = require("../models/models");



module.exports= {
    user:{
        addUser: async (parent,args, context) => {
    
        },
        UpdateUserInfo: async (parent,args, context) => {
    
        },
        DeleteUser: async (parent,args, context) => {
    
        },
    },
    descente:{
        addDescente: async (parent, args, context) =>{
            let added = await model.descente.create({description:args.description,dateDescente:args.date});
            return added;
        },
        updateDescente: async (parent, args, context) =>{
            
        },
        DeleteDescente: async (parent, args, context) =>{
            
        },

    },
    modularite:{
        addLieu: async (parent, args, context) =>{
            let added = await model.lieu.create({region:args.region,district:args.district});
            return added;
        },
        updateLieu: async (parent, args, context) =>{
            
        },
        DeleteLieu: async (parent, args, context) =>{
            
        },
    }

};



