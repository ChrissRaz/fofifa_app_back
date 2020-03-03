let jwt = require("jsonwebtoken");
const keyGen = require('crypto');
const Crypto = require('node-crypt');

const { crypt_salt, sing_scret_key, login_hash } = require("../config/constants");
const msg = require("../config/messages");

const helpers = require("../helpers/helpers");

const db_connect = require("../helpers/db");

const model = require("../models/models");

const Sequelize = require('sequelize');

const Op = Sequelize.Op;


module.exports = {

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
      ...usrAdded.dataValues,
      ...addedBase.dataValues
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
      replacements: { idp: args.IdUser }, type: Sequelize.QueryTypes.SELECT
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
    if (!context.req.auth.connected) {
      throw new Error(msg.notConnectedUser);
    }

    if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
      throw new Error(msg.notAllowedApi);
    }

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


  addDescente: async (_, args, context) => {
    if (!context.req.auth.connected) {
      throw new Error(msg.notConnectedUser);
    }

    if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
      throw new Error(msg.notAllowedApi);
    }
    let added = await model.descente.create({ description: args.description, dateDescente: args.dateDescente });
    return added;
  },

  updateDescente: async (_, args, context) => {
    if (!context.req.auth.connected) {
      throw new Error(msg.notConnectedUser);
    }

    if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
      throw new Error(msg.notAllowedApi);
    }
    await model.descente.update({ description: args.description, dateDescente: args.dateDescente }, {
      where: {
        IdDescente: args.IdDescente
      }
    });

    return model.descente.findByPk(args.IdDescente);
  },

  deleteDescente: async (_, args, context) => {

    if (!context.req.auth.connected) {
      throw new Error(msg.notConnectedUser);
    }

    if (context.req.auth.userInfo.groupe != "CHERCHEUR") {
      throw new Error(msg.notAllowedApi);
    }

    model.descente.destroy({
      where: {
        IdDescente: args.IdDescente
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
      ...added.dataValues, ...args
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
      attributes: ["IdParam",["tableParam","table"],["codeParam", "code"], ["val_param","val"], ["status_param", "status"]]
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

    if (linked)
    {
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


  addEA:  async (_, args, context) => {

      if (!context.req.auth.connected) {
        throw new Error(msg.notConnectedUser);
      }

      let charger = await model.charger.findOne({
        raw: true,
        where: {
          IdPersonne: args.IdEnqueteur,
          IdMission: args.IdMission,
        }
      });

      if (!charger)
      {
        throw  new Error(msg.invalidData);
      }

      let added = await model.EA.create({
        codeEA: args.codeEA,
        IdCharger: charger.IdCharger
      }); 

      helpers.saisir(context.req.auth.userInfo.IdPersonne,added.dataValues.IdEA);

      return added.dataValues;
  },

  updateEA: async (_, args, context) => {

    if (!context.req.auth.connected) {
      throw new Error(msg.notConnectedUser);
    }

    await model.EA.update({
      codeEA: args.codeEA,
    }, {
      where: {
        IdEA: args.IdEA,
      }
    });

    let res = await model.EA.findOne({
      raw: true,
      where: {
        IdEA: args.IdEA
      },
    });

    helpers.saisir(context.req.auth.userInfo.IdPersonne, res.IdEA);

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

    args.InfoMenage.IdPersonne = person.IdPersonne;

    let menage = await model.menage.create({
      ...args.InfoMenage.IdPersonne,
      IdActPcpl: IdactivitePricipale,
        IdActSec: IdactiviteSecondaire,
        IdAutrSrcRev: IdautreSourceRevenu,
        IdNivAtt: IdnivScolaireAtteint,
        IdNivAct : IdnivScolaireAct,
    });

    //ajout relation avec CE et liaison EA

    //reformat menage for MenageType

    return menage;

  },

};





