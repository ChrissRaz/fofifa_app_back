const msg = require("../config/messages");

const seq = require('sequelize');

const model = require("../models/models");

const helpers = require("../helpers/helpers");


module.exports = {
    Query: {

        foncier: async (_, args, context) => {
            let res = await model.foncier.findOne({
                raw: true,
                where: {
                    IdFonc: args.IdFonc
                }
            });

            return res;
        },

        fonciers: async (_, args, context) => {

            let res = await model.foncier.findAll({
                raw: true,
                where: {
                    IdEA: args.IdEA
                }
            });

            return res;
        },
    },

    Mutation: {
        addFoncier: async (_, args, context) => {

            try {

                let added = await model.foncier.create({
                    ...args
                });


                return added.dataValues;

            } catch (error) {
                throw error;
            }
        },
        updateFoncier: async (_, args, context) => {

        },
        deleteFoncier: async (_, args, context) => {

            model.foncier.destroy({
                where: {
                    IdFonc: args.IdFonc
                }
            });

            return true;
        }
    },
}