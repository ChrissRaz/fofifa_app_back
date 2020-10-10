const msg = require("../config/messages");

const seq = require('sequelize');

const model = require("../models/models");

const helpers = require("../helpers/helpers");


module.exports = {
    Query: {

        metayage: async (_, args, context) => {
            let res = await model.metayage.findOne({
                raw: true,
                where: {
                    IdMet: args.IdMet
                }
            });

            return res;
        },

        metayages: async (_, args, context) => {

            let res = await model.location.findAll({
                raw: true,
                where: {
                    IdFoncier: args.IdFoncier
                }
            });

            return res;
        },
    },

    Mutation: {
        addMetayage: async (_, args, context) => {

            try {
                let added = await model.metayage.create({
                    ...args
                });

                return added.dataValues;

            } catch (error) {
                throw error;
            }
        },

        updateMetayage: async (_, args, context) => {

        },

        deleteMetayage: async (_, args, context) => {

            model.metayage.destroy({
                where: {
                    IdMet: args.IdMet
                }
            });

            return true;
        }
    },
}