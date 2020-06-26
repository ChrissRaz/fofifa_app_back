const msg = require("../config/messages");

const model = require("../models/models");

module.exports = {
    Query: {

    },
    Mutation: {

        addMOE: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }


            let person = await model.personne.create(args.personneInfo);

            let moe = await model.moe.create({
                IdPersonne: person.IdPersonne,
                moisDebut: args.moisDebut,
                moisFin: args.moisFin,
                salaireMens: args.salaireMens,
                obs_moe: args.observation,
                IdActPcpl: args.IdActivitPricip,
                IdTypMOE: args.IdTypeMOE,
                IdEA: args.IdEA,
            });

            // let aider = await model.aider.create({
            // IdTypMOE: args.IdTypeMOE,
            // IdMOE: moe.IdPersonne,
            // IdEA: args.IdEA,

            // });


            let avantages = (args.avantages ? args.avantages : []);

            avantages.forEach(async el => {
                await model.avantage_nat.create({
                    IdTypeAvNat: el.type,
                    puAvNat: el.puAvNat,
                    qteAvNat: el.qteAvNat,
                    IdPersonne: person.IdPersonne
                });

            });

            return {
                ...moe.dataValues,
                observation: moe.obs_moe
            }

        },

        updateMOE: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            console.log(args);

            model.personne.update(args.personneInfo, {
                where: {
                    IdPersonne: args.IdMOE
                }
            });

            let person = await model.personne.findOne({
                where: {
                    IdPersonne: args.IdMOE
                },
                raw: true
            });

            await model.moe.update({
                moisDebut: args.moisDebut,
                moisFin: args.moisFin,
                salaireMens: args.salaireMens,
                obs_moe: args.observation,
                IdActPcpl: args.IdActivitPricip,
                IdTypMOE: args.IdTypeMOE,
            }, {
                where: {
                    IdPersonne: person.IdPersonne,
                }
            });

            let moe = await model.moe.findOne({
                raw: true,
                where: {
                    IdPersonne: args.IdMOE
                },

            });

            // console.log(moe);


            let avantages = (args.avantages ? args.avantages : []);

            avantages.forEach(async el => {

                if (el.IdAvNat) {
                    await model.avantage_nat.update({
                        IdTypeAvNat: el.type,
                        puAvNat: el.puAvNat,
                        qteAvNat: el.qteAvNat,
                        IdPersonne: person.IdPersonne
                    }, {
                        where: {
                            IdAvNat: el.IdAvNat
                        }
                    });
                }
                else {
                    await model.avantage_nat.create({
                        IdTypeAvNat: el.type,
                        puAvNat: el.puAvNat,
                        qteAvNat: el.qteAvNat,
                        IdPersonne: person.IdPersonne
                    });
                }
            });

            return {
                ...moe,
                observation: moe.obs_moe
            }

        },

        deleteMOE: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }


            await model.personne.destroy({
                where: {
                    IdPersonne: args.IdMOE
                }
            });


            return true;
        },

        // addExistingMOEToEA: async (_, args, context) => {

        //     // if (!context.req.auth.connected) {
        //     //     throw new Error(msg.notConnectedUser);
        //     // }

        //     let moe =  await model.moe.findOne({
        //         raw: true,
        //         where: {
        //             IdPersonne: args.IdMOE
        //         },

        //     });

        //     let aider = await model.aider.create({
        //         IdTypMOE: args.IdTypeMOE,
        //         IdMOE: moe.IdMOE,
        //         IdEA: args.IdEA,
        //         moisDebut: args.moisDebut,
        //         moisFin:args.moisFin,
        //         salaireMens:args.salaireMens,
        //         obs_moe: args.observation,
        //     });


        //     let avantages = (args.avantages? args.avantages: []);

        //     avantages.forEach(async el => {

        //         await model.avantage_nat.create({   
        //             typeAvNat: el.type,
        //             puAvNat: el.puAvNat,
        //             qteAvNat: el.qteAvNat,
        //             IdPersonne: person.IdPersonne
        //         });
        //     });

        //     return {
        //         ...moe.dataValues,
        //         ...aider.dataValues,
        //         observation: aider.obs_moe
        //     }

        // },
    }
}