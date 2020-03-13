const msg = require("../config/messages");

const model = require("../models/models");

module.exports = {
    Query:{

    },
    Mutation:{

        addMOE: async (_, args, context) => {

            // if (!context.req.auth.connected) {
            //     throw new Error(msg.notConnectedUser);
            // }


            let person = await model.personne.create(args.personneInfo);            

            let moe = await model.moe.create({
                IdPersonne: person.IdPersonne,
                IdActPcpl:args.IdActivitPricip,
            });

            let aider = await model.aider.create({
                IdTypMOE: args.IdTypeMOE,
                IdMOE: moe.IdPersonne,
                IdEA: args.IdEA,
                moisDebut: args.moisDebut,
                moisFin:args.moisFin,
                salaireMens:args.salaireMens,
                obs_moe: args.observation,
            });

            
            let avantages = (args.avantages? args.avantages: []);
            
            avantages.forEach(async el => {

                await model.avantage_nat.create({   
                    typeAvNat: el.type,
                    puAvNat: el.puAvNat,
                    qteAvNat: el.qteAvNat,
                    IdPersonne: person.IdPersonne
                });
            });

            return {
                ...moe.dataValues,
                ...aider.dataValues,
                observation: moe.obs_moe
            }

        },

        updateMOE: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            model.personne.update(args.personneInfo,{
                where: {
                    IdPersonne: args.IdMOE
                }
            });   
            
            let person = await model.personne.findOne({
                where: {
                    IdPersonne: args.IdMOE
                }
            });

            await model.moe.update({
                IdActPcpl:args.IdActivitPricip,
            }, {
                where: {
                    IdPersonne: person.IdPersonne,
                }
            });

            let moe =  await model.moe.findOne({
                where: {
                    IdPersonne: args.IdMOE
                }
            });

            let aider = await model.aider.update({
                IdTypMOE: args.IdTypeMOE,        
                moisDebut: args.moisDebut,
                moisFin:args.moisFin,
                salaireMens:args.salaireMens,
                obs_moe: args.observation,
            }, {
                where: {
                    IdMOE: args.IdMOE,
                    IdEA: args.IdEA,
                }
            });

            
            let avantages = (args.avantages? args.avantages: []);
            
            avantages.forEach(async el => {

                await model.avantage_nat.create({   
                    typeAvNat: el.type,
                    puAvNat: el.puAvNat,
                    qteAvNat: el.qteAvNat,
                    IdPersonne: person.IdPersonne
                });
            });

            return {
                ...moe.dataValues,
                ...aider.dataValues,
                observation: moe.obs_moe
            }
        
        },
        // deleteMOE: async (_, args, context) => {

        //     if (!context.req.auth.connected) {
        //         throw new Error(msg.notConnectedUser);
        //     }

        
        // },
    }
}