let jwt = require("jsonwebtoken");
let bcrypt = require('bcryptjs');
const {crypt_salt,sing_scret_key} = require("../config/constants");
const msg = require("../config/messages");

const db_connect = require("../helpers/db");

const model = require("../models/models");

const Sequelize = require('sequelize');

const Op = Sequelize.Op;


module.exports= {
    
    newUser: async (_,args,context) => {
       
        //à décommenter en prod
        // if (!context.req.auth.connected)
        // {
        //     throw  new Error(msg.notConnectedUser);
        // }

        // if (context.req.auth.userInfo.groupe!="CHERCHEUR")
        // {
        //     throw  new Error(msg.notAllowedApi);
        // }

        let addedBase = await model.personne.create({nom:args.userInfo.nom,prenom:args.userInfo.prenom,sexe:args.userInfo.sexe,age:args.userInfo.age});

        let salt = bcrypt.genSaltSync();
        let added = await model.fofifapers.create({IdPersonne:addedBase.IdPersonne, username:args.loginInfo.username, password: bcrypt.hashSync(args.loginInfo.password,salt),salt:salt});
        let usrAdded = added;

        if (args.groupe=="CHERCHEUR")
        {
            added = await model.chercheur.create({IdPersonne:addedBase.IdPersonne});
        }
        else if (args.groupe=="ENQUETEUR")
        {
            added = await model.enqueteur.create({IdPersonne:addedBase.IdPersonne});
        }
        else if (args.groupe=="SAISISSEUR")
        {
            added = await model.saisisseur.create({IdPersonne:addedBase.IdPersonne});
        }

      
        
        return{
            groupe:args.groupe,
            ...added.dataValues,
            ...usrAdded.dataValues,
            ...addedBase.dataValues
        };   
    },

    // UpdateUserInfo: async (parent,args, context) => {

    // },

    deleteUser: async (_,args, context) => {
      //Vérifier que c'est un utilisateur

      model.personne.destroy({
        where: {
          IdPersonne: args.IdUser
        }
      });

      return true;
    },

    affectEnqueteurToMission: async (_,args, context) => {
        if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        if (context.req.auth.userInfo.groupe!="CHERCHEUR")
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

      if (context.req.auth.userInfo.groupe!="CHERCHEUR")
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

        if (context.req.auth.userInfo.groupe!="CHERCHEUR")
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

        if (context.req.auth.userInfo.groupe!="CHERCHEUR")
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

    addRegion: async (_,args,context) =>{
            
        let added = await model.lieu.create({descriLieu:args.region});
        console.log(added);        

        return {
          ...added.dataValues,
          IdRegion: added.IdLieu,
          region: added.descriLieu
        };
    },

    updateRegion: async (_,args, context) =>{

      if (!context.req.auth.connected)
      {
          throw  new Error(msg.notConnectedUser);
      }

      if (context.req.auth.userInfo.groupe!="CHERCHEUR")
      {
          throw  new Error(msg.notAllowedApi);
      }

      await model.lieu.update({descriLieu:args.region}, {
          where: {
            IdLieu: args.IdRegion,
            IdRegion: {
              [Op.is]: null
            }
          }
        });

        let res = await model.lieu.findOne({
          where: {
            IdLieu: args.IdRegion
          },
          attributes: [ ['IdLieu', 'IdRegion'], ["descriLieu", "region"]] 
        });

        console.log(res);
        
        return  res.dataValues;
        
    },

    deleteRegion: async (_,args, context) =>{

      if (!context.req.auth.connected)
      {
          throw  new Error(msg.notConnectedUser);
      }

      if (context.req.auth.userInfo.groupe!="CHERCHEUR")
      {
          throw  new Error(msg.notAllowedApi);
      }
      model.lieu.destroy({
          where: {
            IdLieu: args.IdRegion,
            IdRegion: {
              [Op.is]: null
            }
          }
        });

      return true;
    },

    addDistrict: async (_,args,context) =>{
            
      let added = await model.lieu.create({descriLieu: args.district, IdRegion: args.IdRegion});
        console.log(added);        

        return {
          ...added,
          IdDistrict: added.IdLieu,
          district: added.descriLieu
        };
    },

    updateDistrict: async (_,args, context) =>{


        if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        if (context.req.auth.userInfo.groupe!="CHERCHEUR")
        {
            throw  new Error(msg.notAllowedApi);
        }

        await model.lieu.update({descriLieu:args.district}, {
          
          where: {
            IdLieu: args.IdDistrict
          }
        });

        return await  model.lieu.findOne({
          raw: true,
          where:{
            IdLieu: args.IdDistrict
          },
          attributes: [ ['IdLieu', 'IdDistrict'], ["descriLieu", "district"],"IdRegion"] 
        });
      
    },

    deleteDistrict: async (_,args, context) =>{

      if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        if (context.req.auth.userInfo.groupe!="CHERCHEUR")
        {
            throw  new Error(msg.notAllowedApi);
        }
        model.lieu.destroy({
            where: {
              IdLieu: args.IdDistrict
            }
          });

        return true;
    },

    addMission : async (_,args,context) => {
      if (!context.req.auth.connected)
      {
          throw  new Error(msg.notConnectedUser);
      }

      if (context.req.auth.userInfo.groupe!="CHERCHEUR")
      {
          throw  new Error(msg.notAllowedApi);
      }
        let added = await model.mission.create({commune: args.commune, fokotany: args.fokotany, village: args.village, 
            IdDescente: args.IdDescente, IdLieu: args.IdDistrict});
        return added;
    },

    updateMission: async (_,args,context) =>{
      if (!context.req.auth.connected)
        {
            throw  new Error(msg.notConnectedUser);
        }

        if (context.req.auth.userInfo.groupe!="CHERCHEUR")
        {
            throw  new Error(msg.notAllowedApi);
        }
        await model.mission.update({commune: args.commune, fokotany: args.fokotany, village: args.village, 
            IdDescente: args.IdDescente, IdLieu: args.IdDistrict}, {
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

        if (context.req.auth.userInfo.groupe!="CHERCHEUR")
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



