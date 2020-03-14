let jwt = require("jsonwebtoken");
const keyGen = require('crypto');
const Crypto = require('node-crypt');

const { sing_scret_key, login_hash,expiration_login } = require("../config/constants");
const msg = require("../config/messages");


const model = require("../models/models");

const seq = require('sequelize');



module.exports = {

    Query: {
        login: async (_, args, context) => {

            let res = {
                token: null,
                groupe: null,
                expiration: expiration_login
            };

            console.log(args);
            
            let groupe = null;

            //récupération de l'info client correspondant
            let usr = await model.fofifapers.findOne({
                where: { username: args.username }
            });

            let usr_copy = usr;

            if (!usr) {
                throw new Error(msg.userNotExist);
            }
            else {
                // vérification du groupe de la personne correspondante
                let idUser = usr_copy.IdPersonne;
                usr = await model.chercheur.findByPk(idUser);

                if (usr) {
                    groupe = "CHERCHEUR";
                }
                else {
                    usr = await model.enqueteur.findByPk(idUser);

                    if (usr) {
                        groupe = "ENQUETEUR";
                    }
                    else {
                        usr = await model.saisisseur.findByPk(idUser);

                        if (user) {
                            groupe = "SAISISSEUR";
                        }
                        else {
                            throw new Error("User not exist");
                        }
                    }
                }
            }


            const crypto = new Crypto({
                key: usr_copy.salt,
                hmacKey: login_hash
            });

            const valid = (args.password == crypto.decrypt(usr_copy.password));

            if (!valid) {
                throw new Error(msg.passwordInvalid);
            }
            else {
                res.groupe = groupe;

                res.token = jwt.sign({ IdPersonne: usr_copy.IdPersonne, usenrame: usr_copy.username, groupe: groupe }, sing_scret_key, {
                    expiresIn: expiration_login
                });

                res = { ...res, user: usr };

                return res;
            }

        },

        checkConnexion: async (_, args, context) => {

            let auth = context.req.auth;

            // console.log(auth);

            if (!auth.connected) {
                return null;
            }

            let res = { token: auth.token, groupe: auth.userInfo.groupe, expiration: expiration_login, user: auth.userInfo, IdPersonne: auth.userInfo.IdUser };

            return res;

        },

        users: async (_, args, context) => {

            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
                throw new Error(msg.notAllowedApi);
            }

            let chercheurs = await context.database.query("SELECT *, 'CHERCHEUR' AS groupe FROM chercheur as us INNER JOIN fofifapers as ffp ON ffp.IdPersonne=us.IdPersonne", {
                type: seq.QueryTypes.SELECT
            });

            let enqueteur = await context.database.query("SELECT *, 'ENQUETEUR' AS groupe FROM enqueteur as us INNER JOIN fofifapers as ffp ON ffp.IdPersonne=us.IdPersonne", {
                type: seq.QueryTypes.SELECT
            });
            let saisisseur = await context.database.query("SELECT *, 'SAISISSEUR' AS groupe FROM saisisseur as us INNER JOIN fofifapers as ffp ON ffp.IdPersonne=us.IdPersonne", {
                type: seq.QueryTypes.SELECT
            });

            let res = [...chercheurs, ...enqueteur, ...saisisseur];

            res.forEach((el, i) => {
                const crypto = new Crypto({
                    key: el.salt,
                    hmacKey: login_hash
                });

                res[i] = {
                    ...res[i],
                    password: crypto.decrypt(el.password)
                };

                delete crypto;
            });

            console.log(res);


            return res;
        },

        user: async (_, args, context) => {

            let res = await context.database.query("SELECT *, \"" + args.groupe + "\" AS groupe FROM " + args.groupe.toLowerCase() + " as us INNER JOIN fofifapers as ffp ON ffp.IdPersonne=us.IdPersonne WHERE us.IdPersonne = :idp", {
                replacements: { idp: args.IdUser }, type: seq.QueryTypes.SELECT
            });


            if (res.length == 0) {
                throw Error(msg.userNotExist);
            }

            res = res[0];

            const crypto = new Crypto({
                key: res.salt,
                hmacKey: login_hash
            });

            res = {
                ...res,
                password: crypto.decrypt(res.password)
            };

            return res;
        },

        availableEnqueteurForDescente: async (_, args, context) => {

            // if (!context.req.auth.connected) {
            //     throw new Error(msg.notConnectedUser);
            // }

            // if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
            //     throw new Error(msg.notAllowedApi);
            // }

            let res = await context.database.query(`SELECT * FROM enqueteur as enq INNER JOIN fofifapers as ffp ON ffp.IdPersonne = enq.IdPersonne WHERE enq.IdPersonne NOT IN  (SELECT enq.IdPersonne FROM descente as des 
                INNER JOIN mission as miss ON miss.IdDescente = des.IdDescente 
                INNER JOIN lieu as li ON li.IdLieu=miss.IdLieu
                INNER JOIN charger as ch ON ch.IdMission = miss.IdMission 
                INNER JOIN enqueteur as enq  ON enq.IdPersonne= ch.IdPersonne 
                WHERE des.IdDescente = :idd AND li.IdLieu != :idl)`, {
                replacements: { idd: args.IdDescente, idl: args.IdDistrict }, type: seq.QueryTypes.SELECT
            });

            // console.log(res);
            
            res.forEach((el, i) => {
                const crypto = new Crypto({
                    key: el.salt,
                    hmacKey: login_hash
                });

                res[i] = {
                    ...res[i],
                    password: crypto.decrypt(el.password)
                };

                delete crypto;
            });
            return res;
        },
    },

    Mutation: {
        newUser: async (_, args, context) => {

            //à décommenter en prod
            // if (!context.req.auth.connected)
            // {
            //     throw  new Error(msg.notConnectedUser);
            // }

            // if (context.req.auth.userInfo.groupe!="CHERCHEUR")
            // {
            //     throw  new Error(msg.notAllowedApi);
            // }

            let addedBase = await model.personne.create({ nom: args.userInfo.nom, prenom: args.userInfo.prenom, sexe: args.userInfo.sexe, age: args.userInfo.age });

            let salt = keyGen.randomBytes(32).toString('hex');

            const crypto = new Crypto({
                key: salt,
                hmacKey: login_hash
            });

            let added = await model.fofifapers.create({ IdPersonne: addedBase.IdPersonne, username: args.loginInfo.username, password: crypto.encrypt(args.loginInfo.password), salt: salt });
            let usrAdded = added;

            if (args.groupe == "CHERCHEUR") {
                added = await model.chercheur.create({ IdPersonne: addedBase.IdPersonne });
            }
            else if (args.groupe == "ENQUETEUR") {
                added = await model.enqueteur.create({ IdPersonne: addedBase.IdPersonne });
            }
            else if (args.groupe == "SAISISSEUR") {
                added = await model.saisisseur.create({ IdPersonne: addedBase.IdPersonne });
            }



            return {
                groupe: args.groupe,
                ...added.dataValues,
                ...{ ...usrAdded.dataValues, actif: parseInt(usrAdded.dataValues.actif) },
                ...{ ...addedBase.dataValues, sexe: parseInt(addedBase.dataValues.sexe) }
            };
        },

        updateUser: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
                throw new Error(msg.notAllowedApi);
            }

            if (args.userInfo) {

                await model.personne.update(args.userInfo, {
                    where: {
                        IdPersonne: args.IdUser
                    }
                });

            }

            if (args.loginInfo) {


                let salt = keyGen.randomBytes(32).toString('hex');

                const crypto = new Crypto({
                    key: salt,
                    hmacKey: login_hash
                });

                args.loginInfo.password = crypto.encrypt(args.loginInfo.password);

                await model.fofifapers.update({ ...args.loginInfo, salt: salt }, {
                    where: {
                        IdPersonne: args.IdUser
                    }
                });

                if (args.groupe == "CHERCHEUR") {

                }
                else if (args.groupe == "SAISISSEUR") {

                }
                else {

                }
            }

            let res = await context.database.query("SELECT *, \"" + args.groupe + "\" AS groupe FROM " + args.groupe.toLowerCase() + " as us INNER JOIN fofifapers as ffp ON ffp.IdPersonne=us.IdPersonne WHERE us.IdPersonne = :idp", {
                replacements: { idp: args.IdUser }, type: seq.QueryTypes.SELECT
            });

            if (res.length == 0) {
                throw Error(msg.userNotExist);
            }

            return res[0];

        },

        deleteUser: async (_, args, context) => {

            if (args.groupe == "ENQUETEUR") {

                let is_ocuped = model.charger.findAll({
                    limit: 1,
                    raw: true,
                    where: {
                        IdPersonne: args.IdUser
                    }
                });

                if (is_ocuped.length > 0) {

                    model.fofifapers.update({ actif: 0 }, {
                        where: {
                            IdPersonne: args.IdUser
                        }
                    });

                    return false;
                }

            }

            else if (args.groupe == "SAISISSEUR") {

            } else {

            }

            model.personne.destroy({
                where: {
                    IdPersonne: args.IdUser
                }
            });

            return true;
        },


        affectEnqueteurToMission: async (_, args, context) => {
            // if (!context.req.auth.connected) {
            //   throw new Error(msg.notConnectedUser);
            // }

            // if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
            //   throw new Error(msg.notAllowedApi);
            // }

            await model.charger.create({ IdPersonne: args.IdEnqueteur, IdMission: args.IdMission });

            return true;
        },

        deleteEnqueteurFromMission: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
                throw new Error(msg.notAllowedApi);
            }

            await model.charger.destroy({
                where: {
                    IdPersonne: args.IdEnqueteur,
                    IdMission: args.IdMission
                }
            });

            return true;
        },


        affectSaisisseurToDescente: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
                throw new Error(msg.notAllowedApi);
            }

            await model.affecter.create({ IdPersonne: args.IdSaisisseur, IdDescente: args.IdDescente });
            return true;
        },

        deleteSaisisseurFromDescente: async (_, args, context) => {
            if (!context.req.auth.connected) {
                throw new Error(msg.notConnectedUser);
            }

            if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
                throw new Error(msg.notAllowedApi);
            }

            await model.affecter.destroy({
                where: {
                    IdPersonne: args.IdSaisisseur,
                    IdDescente: args.IdDescente
                }
            });

            return true;
        },
    }

}