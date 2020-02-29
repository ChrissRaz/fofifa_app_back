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

        regions:[REGION],
        region(IdRegion: ID!): REGION,
        regionsWithAvailableDistrictForDescente(IdDescente: ID!):[REGION],

        missions(IdDescente: ID):[MISSION],
        mission(IdMission: ID):MISSION,
        
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

        addDistrict(IdRegion: ID!, district: String!): DISTRICT,
        updateDistrict(IdDistrict: ID!, district: String!): DISTRICT,
        deleteDistrict(IdDistrict: ID!): Boolean,

        deleteDescente(IdDescente: ID):Boolean,
        addDescente( dateDescente: String!, description: String!): DESCENTE,
        updateDescente(IdDescente: ID! ,dateDescente: String, description: String): DESCENTE,
        

        addMission(commune: String!, fokotany: String!, village: String!, IdDescente: ID!, IdDistrict: ID!): MISSION,
        updateMission(IdMission:ID! ,commune: String!, fokotany: String!, village: String!, IdDescente: ID!, IdDistrict: ID!): MISSION
        deleteMission:Boolean,
    }
`;



const typeDefs =inputs+types+base;

// module.exports.schemas = mergeTypes(merged, { all: true });
// 
module.exports =  typeDefs;