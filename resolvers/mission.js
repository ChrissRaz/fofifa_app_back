const msg = require("../config/messages");

const model = require("../models/models");


module.exports = {
    Query: {
        missions: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR" && context.req.auth.userInfo.groupe != "ENQUETEUR") {
                throw new Error(msg.notAllowedApi);
            }

            let filter = {};

            if (args.IdDescente) {
                filter.IdDescente = args.IdDescente;
            }

            return await model.mission.findAll({
                where: filter,
                attributes: [['IdLieu', 'IdDistrict'], "commune", "fokotany", "village", "IdDescente", "IdMission", "IdLieu"]
            });
        },

        mission: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR" && context.req.auth.userInfo.groupe != "ENQUETEUR") {
                throw new Error(msg.notAllowedApi);
            }

            return await model.mission.findByPk(args.IdMission);
        },
    },

    Mutation: {
        addMission: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
                throw new Error(msg.notAllowedApi);
            }
            let added = await model.mission.create({
                commune: args.commune, fokotany: args.fokotany, village: args.village,
                IdDescente: args.IdDescente, IdLieu: args.IdDistrict
            });
            return added;
        },

        updateMission: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
                throw new Error(msg.notAllowedApi);
            }
            await model.mission.update({
                commune: args.commune, fokotany: args.fokotany, village: args.village,
                IdDescente: args.IdDescente, IdLieu: args.IdDistrict
            }, {
                where: {
                    IdMission: args.IdMission
                }
            });
            return model.mission.findByPk(args.IdMission);

        },

        deleteMission: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
                throw new Error(msg.notAllowedApi);
            }
            model.mission.destroy({
                where: {
                    IdMission: args.IdMission
                }
            });

            return true;
        },

    }
}