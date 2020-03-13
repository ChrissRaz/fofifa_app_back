const msg = require("../config/messages");

const helpers = require("../helpers/helpers");

const model = require("../models/models");

const seq = require('sequelize');

const Op = seq.Op;

module.exports = {
    Query: {
        associations: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            let res = await model.association.findAll({
                raw: true
            });

            return res;
        },

        association: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            let res = await model.association.findOne({
                raw: true,
                where: {
                    IdAssoc: args.IdAssoc
                }
            });

            return res;
        },

        regions: async (_, args, context) => {
            // if (!context.req.auth.connected) {
            //     throw new Error(msg.notConnectedUser);
            // }

            let res = await model.lieu.findAll({
                raw: true,
                where: {
                    IdRegion: {
                        [Op.is]: null
                    }
                },
                attributes: [['IdLieu', 'IdRegion'], ["descriLieu", "region"]]
            });

            // console.log(res);
            res.forEach((el, i) => {

                res[i] = {
                    ...res[i],
                    IdDescente: args.IdDescente,
                    IdDisctrictOfMission: args.IdDisctrictOfMission,
                    isForm: args.isForm
                };

            });

            return res;
        },

        region: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            let res = await model.lieu.findOne({
                raw: true,
                where: {
                    IdLieu: args.IdRegion,
                    IdRegion: {
                        [Op.is]: null
                    },
                },
                attributes: [['IdLieu', 'IdRegion'], ["descriLieu", "region"]]
            });

            res = {
                ...res,
                IdDescente: args.IdDescente,
                IdDisctrictOfMission: args.IdDisctrictOfMission
            };

            return res;
        },


        parametres: async (_, args, context) => {

            // if (!context.req.auth.connected)
            // {
            //     throw  new Error(msg.notConnectedUser);
            // }

            // if (context.req.auth.userInfo.groupe!="CHERCHEUR" && context.req.auth.userInfo.groupe!="ENQUETEUR")
            // {
            //     throw  new Error(msg.notAllowedApi);
            // }

            let status = true;

            if (!(typeof args.status === 'undefined')) {
                status = args.status;
            }


            return await model.param_divers.findAll({
                raw: true,
                where: {
                    tableParam: args.table,
                    status_param: status
                },
                attributes: ["IdParam", ["tableParam", "table"], ["codeParam", "code"], ["val_param", "val"], ["status_param", "status"]]
            });
        },

        parametre: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR" && context.req.auth.userInfo.groupe != "ENQUETEUR") {
                throw new Error(msg.notAllowedApi);
            }

            return await model.param_divers.findOne({
                raw: true,
                where: {
                    tableParam: args.table,
                    IdParam: args.IdParam
                },
                attributes: ["IdParam", ["tableParam", "table"], ["codeParam", "code"], ["val_param", "val"], ["status_param", "status"]]
            });
        },
    },

    Mutation: {
        addAssociation: async (_, args, context) => {
            // if (!context.req.auth.connected) {
            //   throw new Error(msg.notConnectedUser);
            // }

            let assoc = await model.association.create({ nomAssoc: args.nomAssoc, IdType: args.IdTypeAssoc }, {
                raw: true
            });

            return assoc;
        },

        updateAssociation: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            await model.association.update({ nomAssoc: args.nomAssoc, IdType: args.IdTypeAssoc }, {
                raw: true,
                where: {
                    IdAssoc: args.IdAssoc
                }
            });

            return await model.association.findOne({
                where: {
                    IdAssoc: args.IdAssoc,
                },
                raw: true
            });
        },

        deleteAssociation: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            await model.association.destroy({
                where: {
                    IdAssoc: args.IdAssoc
                }
            });

            return true;
        },
        addRegion: async (_, args, context) => {

            let added = await model.lieu.create({ descriLieu: args.region });
            // console.log(added);

            return {
                ...added.dataValues,
                IdRegion: added.IdLieu,
                region: added.descriLieu
            };
        },

        updateRegion: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
                throw new Error(msg.notAllowedApi);
            }

            await model.lieu.update({ descriLieu: args.region }, {
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
                attributes: [['IdLieu', 'IdRegion'], ["descriLieu", "region"]]
            });

            // console.log(res);

            return res.dataValues;

        },

        deleteRegion: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
                throw new Error(msg.notAllowedApi);
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


        addDistrict: async (_, args, context) => {

            let added = await model.lieu.create({ descriLieu: args.district, IdRegion: args.IdRegion });
            console.log(added);

            return {
                ...added,
                IdDistrict: added.IdLieu,
                district: added.descriLieu
            };
        },

        updateDistrict: async (_, args, context) => {


            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
                throw new Error(msg.notAllowedApi);
            }

            await model.lieu.update({ descriLieu: args.district }, {

                where: {
                    IdLieu: args.IdDistrict
                }
            });

            return await model.lieu.findOne({
                raw: true,
                where: {
                    IdLieu: args.IdDistrict
                },
                attributes: [['IdLieu', 'IdDistrict'], ["descriLieu", "district"], "IdRegion"]
            });

        },


        deleteDistrict: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
                throw new Error(msg.notAllowedApi);
            }
            model.lieu.destroy({
                where: {
                    IdLieu: args.IdDistrict
                }
            });

            return true;
        },
        addParam: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
                throw new Error(msg.notAllowedApi);
            }

            let added = await model.param_divers.create({
                tableParam: args.table,
                codeParam: args.code,
                val_param: args.val,
                status_param: args.status
            });

            return {
                ...{ ...added.dataValues, status: added.dataValues.status }, ...args
            };
        },

        updateParam: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
                throw new Error(msg.notAllowedApi);
            }

            await model.param_divers.update({
                codeParam: args.code,
                val_param: args.val,
                status_param: args.status
            }, {
                where: {
                    IdParam: args.IdParam,
                    tableParam: args.table
                }
            });

            let res = await model.param_divers.findByPk(args.IdParam, {
                raw: true,
                attributes: ["IdParam", ["tableParam", "table"], ["codeParam", "code"], ["val_param", "val"], ["status_param", "status"]]
            });

            // console.log(res);

            return res;

        },

        deleteParam: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
                throw new Error(msg.notAllowedApi);
            }

            let linked = false;

            // Vérification de liaison

            if (linked) {
                return false;
            }

            await model.param_divers.destroy({
                where: {
                    IdParam: args.IdParam,
                    tableParam: args.table
                }
            });

            return true;

        },
    }
}