const msg = require("../config/messages");

const seq = require('sequelize');

const model = require("../models/models");

const helpers = require("../helpers/helpers");


module.exports = {
    Query: {
        EAs: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            let res = null;

            if (args.IdMission && args.IdEnqueteur) {
                res = await context.database.query(`
                    SELECT * FROM ea 
                    INNER JOIN charger as ch ON ch.IdCharger = ea.IdCharger WHERE ch.IdMission =:idm AND ch.IdPersonne = :idp`, {
                    replacements: {
                        idm: args.IdMission,
                        idp: args.IdEnqueteur
                    }, type: seq.QueryTypes.SELECT
                });
            }
            else if (args.IdMission) {
                res = await context.database.query(`
                    SELECT * FROM ea 
                    INNER JOIN charger as ch ON ch.IdCharger = ea.IdCharger WHERE ch.IdMission =:idm`, {
                    replacements: {
                        idm: args.IdMission
                    }, type: seq.QueryTypes.SELECT
                })
            }
            else if (args.IdEnqueteur) {
                res = await context.database.query(`
                    SELECT * FROM ea 
                    INNER JOIN charger as ch ON ch.IdCharger = ea.IdCharger WHERE ch.IdPersonne = :idp`, {
                    replacements: {
                        idp: args.IdEnqueteur
                    }, type: seq.QueryTypes.SELECT
                })
            }
            else {
                res = await model.EA.findAll({
                    raw: true,
                });
            }

            return res;
        },

        EA: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            return await model.EA.findOne({
                raw: true,
                where: {
                    IdEA: args.IdEA
                }
            });
        },

        EAOfConnectedUser: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            let IdUser = context.req.auth.userInfo.IdPersonne;

            let res = await model.saisir.findAll({
                raw: true,
                where: {
                    IdPersonne: IdUser,
                    is_creator: true
                }
            });

            return res.map(el => el.IdEA);
        },
    },



    Mutation: {

        addEA: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            let IdUser = context.req.auth.userInfo.IdPersonne;

            let charger = await model.charger.findOne({
                raw: true,
                where: {
                    IdPersonne: args.IdEnqueteur,
                    IdMission: args.IdMission,
                }
            });

            // avoir l'id du status en saisi
            let status = await model.param_divers.findOne({
                where: {
                    codeParam: "EN_SAISI",
                },
                raw: true
            });

            console.log(status);


            if (!charger) {
                throw new Error(msg.invalidData);
            }

            let added = await model.EA.create({
                codeEA: args.codeEA,
                dateEnquete: args.dateEnquete,
                IdCharger: charger.IdCharger,
                IdStatus: status.IdParam
            });

            // helpers.saisir(context.req.auth.userInfo.IdPersonne, added.dataValues.IdEA);

            //ajout dans histrorique

            await model.saisir.create({
                IdPersonne: IdUser,
                IdEA: added.IdEA,
                is_creator: true
            })

            return added.dataValues;
        },

        updateEA: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (args.codeStatus) {
                let status = await model.param_divers.findOne({
                    where: {
                        codeParam: args.codeStatus,
                    },
                    raw: true
                });
                console.log("status", status);

                await model.EA.update({
                    codeEA: args.codeEA,
                    IdStatus: status.IdParam,
                    dateEnquete: args.dateEnquete
                }, {
                    where: {
                        IdEA: args.IdEA
                    }
                });

            } else {
                await model.EA.update({
                    codeEA: args.codeEA,
                    dateEnquete: args.dateEnquete
                }, {
                    where: {
                        IdEA: args.IdEA
                    }
                });
            }




            let res = await model.EA.findOne({
                raw: true,
                where: {
                    IdEA: args.IdEA
                },
            });

            // helpers.saisir(context.req.auth.userInfo.IdPersonne, res.IdEA);

            return res;
        },

        deleteEA: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            model.EA.destroy({
                where: {
                    IdEA: args.IdEA
                }
            });

            return true;

        },
    }
}