let jwt = require("jsonwebtoken");
let bcrypt = require('bcryptjs');
const {crypt_salt,sing_scret_key} = require("../config/constants");
const msg = require("../config/messages");



const db_connect = require("../helpers/db");

const model = require("../models/models");


module.exports= {
    
    newUser: async (_,args,context) => {
       
        if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        if (context.req.auth.userInfo.group!="CHERCHEUR")
        {
            throw  new Error(msg.notAllowedApi);
        }

        let addedBase = await model.personne.create({nom:args.userInfo.nom,prenom:args.userInfo.prenom,sexe:args.userInfo.sexe,age:args.userInfo.age});

        let salt = bcrypt.genSaltSync();
        let added = await model.fofifapers.create({IdPersonne:addedBase.IdPersonne, username:args.loginInfo.username, password: bcrypt.hashSync(args.loginInfo.password,salt),salt:salt});

        if (args.group=="CHERCHEUR")
        {
            added = await model.chercheur.create({IdPersonne:addedBase.IdPersonne});
        }
        else if (args.group=="ENQUETEUR")
        {
            added = await model.enqueteur.create({IdPersonne:addedBase.IdPersonne});
        }
        else if (args.group=="SAISISSEUR")
        {
            added = await model.saisisseur.create({IdPersonne:addedBase.IdPersonne});
        }
        
        return{
            group:args.group,
            IdPersonne: added.IdPersonne
        };   
    },
    // UpdateUserInfo: async (parent,args, context) => {

    // },
    // DeleteUser: async (parent,args, context) => {

    // },
    affectEnqueteurToMission: async (_,args, context) => {
        if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        if (context.req.auth.userInfo.group!="CHERCHEUR")
        {
            throw  new Error(msg.notAllowedApi);
        }

        added = await model.charger.create({IdPersonne:args.IdEnqueteur, IdMission: args.IdMission});
        return  true;
    },
    

    addDescente: async (_,args,context) =>{
      if (!context.req.auth.connected)
      {
          throw  new Error(msg.notConnectedUser);
      }

      if (context.req.auth.userInfo.group!="CHERCHEUR")
      {
          throw  new Error(msg.notAllowedApi);
      }
      let added = await model.descente.create({description:args.description,dateDescente:args.dateDescente});
      return added;
    },
    updateDescente: async (_,args,context) =>{
        if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        if (context.req.auth.userInfo.group!="CHERCHEUR")
        {
            throw  new Error(msg.notAllowedApi);
        }
         await model.descente.update({description:args.description,dateDescente:args.dateDescente}, {
            where: {
              IdDescente: args.IdDescente
            }
          });

        return model.descente.findByPk(args.IdDescente);
    },
    deleteDescente: async (_,args,context) =>{

      if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        if (context.req.auth.userInfo.group!="CHERCHEUR")
        {
            throw  new Error(msg.notAllowedApi);
        }

        model.descente.destroy({
            where: {
              IdDescente: args.IdDescente
            }
          });

        return true;
    },

    addLieu: async (_,args,context) =>{
            
        let added = await model.lieu.create({region:args.region,district:args.district});
        console.log(added);        

        return added;
    },
    updateLieu: async (_,args, context) =>{

      if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        if (context.req.auth.userInfo.group!="CHERCHEUR")
        {
            throw  new Error(msg.notAllowedApi);
        }
        await model.lieu.update({region:args.region,district:args.district}, {
            where: {
              IdLieu: args.IdLieu
            }
          });

        return model.lieu.findByPk(args.IdLieu);
        
    },
    deleteLieu: async (_,args, context) =>{

      if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        if (context.req.auth.userInfo.group!="CHERCHEUR")
        {
            throw  new Error(msg.notAllowedApi);
        }
        model.lieu.destroy({
            where: {
              IdLieu: args.IdLieu
            }
          });

        return true;
    },


    addMission : async (_,args,context) => {
      if (!context.req.auth.connected)
      {
          throw  new Error(msg.notConnectedUser);
      }

      if (context.req.auth.userInfo.group!="CHERCHEUR")
      {
          throw  new Error(msg.notAllowedApi);
      }
        let added = await model.mission.create({commune: args.commune, fokotany: args.fokotany, village: args.village, 
            IdDescente: args.IdDescente, IdLieu: args.IdLieu});
        return added;
    },
    updateMission: async (_,args,context) =>{
      if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        if (context.req.auth.userInfo.group!="CHERCHEUR")
        {
            throw  new Error(msg.notAllowedApi);
        }
        await model.mission.update({commune: args.commune, fokotany: args.fokotany, village: args.village, 
            IdDescente: args.IdDescente, IdLieu: args.IdLieu}, {
            where: {
              IdMission: args.IdMission
            }
          });
        return model.mission.findByPk(args.IdMission);
        
    },
    deleteMission: async (_,args, context) =>{
      if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        if (context.req.auth.userInfo.group!="CHERCHEUR")
        {
            throw  new Error(msg.notAllowedApi);
        }
        model.mission.destroy({
            where: {
              IdMission: args.IdMission
            }
          });

        return true;
    },

};



