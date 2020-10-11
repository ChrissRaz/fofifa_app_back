const msg = require("../config/messages");

const model = require("../models/models");

const seq = require('sequelize');


module.exports = {
  Query: {
    descentes: async (_, args, context) => {
      if (!context.req.auth.connected) {
        throw new Error(msg.notConnectedUser);
      }

      let res = [];

      if (!context.req.auth.connected) {
        throw new Error(msg.notConnectedUser);
      }

      console.log(context.req.auth.userInfo);

      if (context.req.auth.userInfo.groupe == "SAISISSEUR") {
        console.log('Id saisisseur ', context.req.auth.userInfo.IdPersonne);

        res = await context.database.query(`
          SELECT descente.* FROM descente INNER JOIN affecter as af ON af.IdDescente = descente.IdDescente WHERE af.IdPersonne =:idp`,
          {
            replacements: {
              idp: context.req.auth.userInfo.IdPersonne
            }, type: seq.QueryTypes.SELECT
          });

        console.log(res);

      } else {
        console.log("bbbbbbbbbbbbbbbbbbbb");
        res = await model.descente.findAll();
      }

      return res;
    },

    descente: async (_, args, context) => {
      if (!context.req.auth.connected) {
        throw new Error(msg.notConnectedUser);
      }
      let res = await model.descente.findByPk(args.IdDescente);

      return res;
    },
  },

  Mutation: {
    addDescente: async (_, args, context) => {
      if (!context.req.auth.connected) {
        throw new Error(msg.notConnectedUser);
      }

      if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
        throw new Error(msg.notAllowedApi);
      }
      let added = await model.descente.create({ description: args.description, dateDescente: args.dateDescente });
      return added;
    },

    updateDescente: async (_, args, context) => {
      if (!context.req.auth.connected) {
        throw new Error(msg.notConnectedUser);
      }

      if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
        throw new Error(msg.notAllowedApi);
      }
      await model.descente.update({ description: args.description, dateDescente: args.dateDescente }, {
        where: {
          IdDescente: args.IdDescente
        }
      });

      return model.descente.findByPk(args.IdDescente);
    },

    deleteDescente: async (_, args, context) => {

      if (!context.req.auth.connected) {
        throw new Error(msg.notConnectedUser);
      }

      if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
        throw new Error(msg.notAllowedApi);
      }

      model.descente.destroy({
        where: {
          IdDescente: args.IdDescente
        }
      });

      return true;
    },
  }
}