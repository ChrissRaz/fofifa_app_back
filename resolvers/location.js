const msg = require("../config/messages");

const seq = require('sequelize');

const model = require("../models/models");

const helpers = require("../helpers/helpers");


module.exports = {
    Query: {

        location: async (_, args, context) => {
            let res = await model.location.findOne({
                raw: true,
                where: {
                    IdLoc: args.IdLoc
                }
            });

            return res;
        },

        locations: async (_, args, context) => {

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
        addLocation: async (_, args, context) => {

            try {
                let added = await model.location.create({
                    ...args
                });

                return added.dataValues;

            } catch (error) {
                throw error;
            }
        },

        updateLocation: async (_, args, context) => {

        },

        deleteLocation: async (_, args, context) => {

            model.location.destroy({
                where: {
                    IdLoc: args.IdLoc
                }
            });

            return true;
        }
    },
}