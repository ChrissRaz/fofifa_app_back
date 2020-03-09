const {gql} = require('../helpers/helpers');
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

        regions(IdDescente: ID, IdDisctrictOfMission: ID):[REGION],
        region(IdRegion: ID!,IdDescente: ID, IdDisctrictOfMission: ID): REGION,
        # regionsWithAvailableDistrictForDescente(IdDescente: ID!, IdMission: ID):[REGION],

        missions(IdDescente: ID):[MISSION],
        mission(IdMission: ID):MISSION,

        parametres(table: PARAM_TYPE!, status: Boolean): [PARAM],
        parametre(table: PARAM_TYPE!, IdParam: ID!): PARAM,

        EAs(IdMission: ID, IdEnqueteur: ID): [EA],
        EA(IdEA: ID):EA,

        menages(IdEA: ID!):[MENAGE],
        menage(IdMenage: ID!,IdEA: ID!): MENAGE,
        associations: [ASSOCIATION],
        association(IdAssoc: ID!):ASSOCIATION
    }
      
    type Mutation{
        newUser(groupe: GROUP!,userInfo: userInfo!, loginInfo: loginInfo): USER,
        updateUser(groupe: GROUP!,IdUser: ID!, userInfo: userInfo, loginInfo: loginInfo): USER,
        deleteUser(groupe: GROUP!, IdUser: ID!): Boolean,
        
        affectEnqueteurToMission(IdMission: ID!, IdEnqueteur: ID!): Boolean,
        deleteEnqueteurFromMission(IdMission: ID!, IdEnqueteur: ID!): Boolean,

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

        addEA(codeEA: String!,dateEnquete: String!, IdEnqueteur: ID!, IdMission: ID!): EA!,
        updateEA(IdEA: ID!, codeEA: String!, dateEnquete: String!,codeStatus: CODE_STATUS!): EA!,
        deleteEA(IdEA: ID!): Boolean, 

        addMenage(InfoMenage: menage!, IdEA: ID!): MENAGE!,
        updateMenage(IdMenage: ID!, IdEA: ID!, InfoMenage: menage!): MENAGE!,
        deleteMenage(IdMenage: ID!): Boolean,

        addAssociation(nomAssoc: String!, IdTypeAssoc: ID!): ASSOCIATION,
        updateAssociation(IdAssoc: ID! , nomAssoc: String!, IdTypeAssoc: ID!): ASSOCIATION,
        deleteAssociation(IdAssoc: ID!): Boolean,

        addAssociationToMenage(IdPersonne: ID!, IdAssoc: ID!): ASSOCIATION_PERSONNE,
        updateAssociationOfMenage(IdPersonne: ID!, IdAssoc: ID!,actif: Boolean!): ASSOCIATION_PERSONNE,
        deleteAssociationOfMenage(IdPersonne: ID!, IdAssoc: ID!): Boolean
    }
`;



const typeDefs =inputs+types+base;

// module.exports.schemas = mergeTypes(merged, { all: true });
// 
module.exports =  typeDefs;