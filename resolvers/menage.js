const msg = require("../config/messages");

const seq = require('sequelize');

const model = require("../models/models");


module.exports = {
    Query: {
        menage: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            let res = await model.menage.findOne({
                raw: true,
                where: {
                    IdPersonne: args.IdMenage,
                }
            });

            return {
                ...res,
                ...args
            }
        },
        menages: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            let res = await context.database.query(`
            SELECT * FROM menage  
            INNER JOIN avoir_famille  AS af ON af.IdPersonne= menage.IdPersonne 
            WHERE af.IdEA= :idea` , {
                replacements: {
                    idea: args.IdEA
                },
                type: seq.QueryTypes.SELECT
            });

            console.log(res);

            return res;
        },

    },

    Mutation: {
        addMenage: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            let person = await model.personne.create(args.InfoMenage.details_personne);

            // let manageInfo = {
            //   IdPersonne:,
            //   utaFamiliale:,
            //   utaAgricole:,
            //   autreRessRev: ,
            //   dateEnquete: ,
            //   presence: ,
            //   obs_men: ,
            // };

            args.InfoMenage = { IdPersonne: person.IdPersonne, ...args.InfoMenage };

            let menage = await model.menage.create(args.InfoMenage);


            await model.avoir_famille.create({
                IdPersonne: person.IdPersonne,
                IdEA: args.IdEA,
                IdRelaCE: args.InfoMenage.IdRelAvecCE
            });

            let res = await model.menage.findOne({
                raw: true,
                where: {
                    IdPersonne: menage.IdPersonne,
                }
            });

            return {
                ...res,
                ...args
            }

        },

        updateMenage: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            // console.log(args);

            await model.personne.update(args.InfoMenage.details_personne, {
                where: {
                    IdPersonne: args.IdMenage
                }
            });

            model.menage.update(args.InfoMenage, {
                where: {
                    IdPersonne: args.IdMenage
                }
            });


            let res = await model.menage.findOne({
                raw: true,
                where: {
                    IdPersonne: args.IdMenage,
                }
            });

            // console.log(res);


            return {
                ...res,
                ...args
            }

        },

        deleteMenage: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            model.personne.destroy({
                where: {
                    IdPersonne: args.IdMenage
                }
            });

            return true;

        },

        addAssociationToMenage: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            let assoc = await model.etre_membre.create({ IdAssoc: args.IdAssoc, IdPersonne: args.IdPersonne }, {
                raw: true,
                plain: true
            });

            return { ...assoc.dataValues, actif: parseInt(assoc.dataValues.actif) };
        },

        addAssociationsToMenage: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            let ids = args.IdsAssoc.forEach(el => {
                return { IdAssoc: el, IdPersonne: args.IdPersonne }
            });

            let assoc = await model.etre_membre.bulkCreate(ids, {
                raw: true,
                plain: true
            });

            console.log(assoc);

            return [];
            // return { ...assoc.dataValues, actif: parseInt(assoc.dataValues.actif) };
        },

        updateAssociationOfMenage: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            await model.etre_membre.update({ actif: args.actif, }, {
                raw: true,
                plain: true,
                where: {
                    IdAssoc: args.IdAssoc,
                    IdPersonne: args.IdPersonne,
                }
            });

            return args;

        },

        deleteAssociationOfMenage: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            await model.etre_membre.destroy({
                where: {
                    IdAssoc: args.IdAssoc,
                    IdPersonne: args.IdPersonne,
                }
            });

            return true;

        },

    }
}