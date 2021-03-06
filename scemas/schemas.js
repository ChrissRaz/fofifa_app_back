const { gql } = require('../helpers/helpers');
const types = require("./types");
const inputs = require("./inputs");

const base = gql` 

    type Query {
        login(username: String!, password: String!): AUTHPAYLOAD,
        checkConnexion: AUTHPAYLOAD,
        users:[USER],
        user(groupe: GROUP!, IdUser: ID!):USER,
        availableEnqueteurForDescente(IdDescente: ID!, IdDistrict: ID!):[ENQUETEUR],
        descentes:[DESCENTE],
        descente(IdDescente: ID):DESCENTE,

        regions(IdDescente: ID, IdDisctrictOfMission: ID, isForm: Boolean):[REGION],
        region(IdRegion: ID!,IdDescente: ID, IdDisctrictOfMission: ID): REGION,

        missions(IdDescente: ID):[MISSION],
        mission(IdMission: ID):MISSION,

        parametres(table: PARAM_TYPE!, status: Boolean): [PARAM],
        parametre(table: PARAM_TYPE!, IdParam: ID!): PARAM,
        parametreByCode(table: PARAM_TYPE!, codeParam: ID!): PARAM,

        EAs(IdMission: ID, IdEnqueteur: ID): [EA],
        EA(IdEA: ID):EA,
        EAOfConnectedUser:[String],

        menages(IdEA: ID!):[MENAGE],
        menage(IdMenage: ID!,IdEA: ID!): MENAGE,
        associations: [ASSOCIATION],
        association(IdAssoc: ID!):ASSOCIATION,


        foncier (IdFonc: ID!):FONCIER,
        fonciers (IdEA: ID!):[FONCIER],

        location (IdLoc: ID!):LOCATION,
        locations (IdFoncier: ID!):[LOCATION],

        metayage (IdMet: ID!):METAYAGE,
        metayages (IdFoncier: ID!):[METAYAGE]




    }
    
    type Mutation{
        newUser(groupe: GROUP!,userInfo: userInfo!, loginInfo: loginInfo): USER,
        updateUser(groupe: GROUP!,IdUser: ID!, userInfo: userInfo, loginInfo: loginInfo, actif: Boolean): USER,
        deleteUser(groupe: GROUP!, IdUser: ID!): Boolean,
        
        affectEnqueteurToMission(IdMission: ID!, IdEnqueteur: ID!): Boolean,
        affectEnqueteursToMission(IdMission: ID!, IdEnqueteurs: [ID!]!): Boolean,
        deleteEnqueteurFromMission(IdMission: ID!, IdEnqueteur: ID!): Boolean,
        deleteEnqueteursFromMission(IdMission: ID!, IdEnqueteurs: [ID]!): Boolean,

        affectSaisisseurToDescente(IdSaisisseur: ID!, IdDescente: ID!): Boolean,
        deleteSaisisseurFromDescente(IdSaisisseur: ID!, IdDescente: ID!): Boolean,


        addRegion(region: String!) : REGION,
        updateRegion(IdRegion: ID!, region: String!) : REGION,
        deleteRegion(IdRegion: ID!): Boolean,

        addParam(table: PARAM_TYPE!,code: String,val: String!,status: Boolean!): PARAM,
        updateParam(table: PARAM_TYPE!,IdParam: ID!, code: String,val: String!,status: Boolean!): PARAM,
        deleteParam(table: PARAM_TYPE!,IdParam: ID!): Boolean,

        addDistrict(IdRegion: ID!, district: String!): DISTRICT,
        updateDistrict(IdDistrict: ID!, district: String!): DISTRICT,
        deleteDistrict(IdDistrict: ID!): Boolean,

        deleteDescente(IdDescente: ID):Boolean,
        addDescente( dateDescente: String!, description: String!): DESCENTE,
        updateDescente(IdDescente: ID! ,dateDescente: String, description: String): DESCENTE,
        
        addMission(commune: String!, fokotany: String!, village: String!, IdDescente: ID!, IdDistrict: ID!): MISSION,
        updateMission(IdMission:ID! ,commune: String!, fokotany: String!, village: String!, IdDescente: ID!, IdDistrict: ID!): MISSION,
        deleteMission(IdMission: ID!):Boolean,
        deleteMissions(IdMissions: [ID]!):Boolean,
        deleteMissionsOfDistrict(IdDescente: ID!, IdDistrict: ID!):Boolean,

        addMissionsWithEquipe(IdEnqueteurs: [ID!]!, IdDescente: ID!, IdDistrict: ID!, missions: [mission_input!]!): [MISSION],

        addEA(codeEA: String!,dateEnquete: String!, IdEnqueteur: ID!, IdMission: ID!): EA!,
        updateEA(IdEA: ID!, codeEA: String!, dateEnquete: String!,codeStatus: CODE_STATUS): EA!,
        deleteEA(IdEA: ID!): Boolean, 

        addMenage(InfoMenage: menageInput!, IdEA: ID!): MENAGE!,
        updateMenage(IdMenage: ID!, IdEA: ID!, InfoMenage: menageInput!): MENAGE!,
        deleteMenage(IdMenage: ID!): Boolean,

        addAssociation(nomAssoc: String!, IdTypeAssoc: ID!): ASSOCIATION,
        updateAssociation(IdAssoc: ID! , nomAssoc: String!, IdTypeAssoc: ID!): ASSOCIATION,
        deleteAssociation(IdAssoc: ID!): Boolean,

        addAssociationToMenage(IdPersonne: ID!, IdAssoc: ID!): ASSOCIATION_PERSONNE,
        addAssociationsToMenage(IdPersonne: ID!, IdsAssoc: [ID!]): [ASSOCIATION_PERSONNE],
        updateAssociationOfMenage(IdPersonne: ID!, IdAssoc: ID!,actif: Boolean!): ASSOCIATION_PERSONNE,
        deleteAssociationOfMenage(IdPersonne: ID!, IdAssoc: ID!): Boolean,

        addMOE(IdEA: ID!, personneInfo: personneInfo!, moisDebut: String! moisFin: String!,salaireMens: Float!, observation: String, IdTypeMOE: ID!, IdActivitPricip: ID ,avantages: [avantage_nat]):MOE,
        updateMOE(IdMOE: ID!,personneInfo: personneInfo!, moisDebut: String! moisFin: String!,salaireMens: Float!, observation: String, IdTypeMOE: ID!, IdActivitPricip: ID, avantages: [avantage_nat]):MOE,
        deleteMOE( IdMOE: ID!):Boolean,


        addFoncier(IdEA: ID!, nbParc: Int!,denom: String!,surface: Float!, anneAcquis: String!,  mntFonc: Float,cultive: Boolean!,observation: String, IdTypeTopo: ID!,IdModeAcquis: ID! IdTypeChamp: ID!,IdModeTenure: ID!,IdStatutFoncier: ID!): FONCIER,
        updateFoncier(IdFonc: ID!):FONCIER,
        deleteFoncier(IdFonc: ID!):Boolean,


        addLocation(IdFoncier: ID!, mntLoc: Float!,dureeLoc: Int!,nbParc: Int!,observation: String):LOCATION,
        updateLocation(IdLoc: ID!,mntLoc: Float!,dureeLoc: Int!,nbParc: Int!,observation: String):LOCATION,
        deleteLocation(IdLoc: ID!):Boolean,

        addMetayage(IdFoncier: ID!, pu: Float!, qte: Float!, dureeMet: Float!, nbParc: Int!, observation: String,IdTypeCult: ID!):METAYAGE,
        updateMetayage(IdMet: ID!, pu: Float!, qte: Float!, dureeMet: Float!, nbParc: Int!, observation: String,IdTypeCult: ID!):METAYAGE,
        deleteMetayage(IdMet: ID!):Boolean,

        # addExistingMOEToEA(IdEA: ID!, IdMOE: ID!, moisDebut: String! moisFin: String!,salaireMens: Float!, observation: String, IdTypeMOE: ID!):MOE

    }
`;



const typeDefs = inputs + types + base;

// module.exports.schemas = mergeTypes(merged, { all: true });
// 
module.exports = typeDefs;