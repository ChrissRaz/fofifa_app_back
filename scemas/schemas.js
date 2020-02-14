// const { gql } = require('apollo-server-express');

// const {mergeTypes}= require('merge-graphql-schemas');
const {gql} = require('../helpers/helpers');
const types = require("./types");
const inputs = require("./inputs");


const base = gql` 

    type Query {
        login(username: String!, password: String!): AUTHPAYLOAD,
        users:[USER],
        user(group: GROUP!, IdUser: ID!):USER,
        availableEnqueteurForDescente(IdDescente: ID):[ENQUETEUR]

        descentes:[DESCENTE],
        descente(IdDescente: ID):DESCENTE,
        lieux:[LIEU],
        lieu(IdLieu: ID): LIEU,
        missions(IdDescente: ID):[MISSION],
        mission(IdMission: ID):MISSION,
        
    }
      
    type Mutation{
        newUser(group: GROUP!,userInfo: userInfo!, loginInfo: loginInfo): USER,
        affectEnqueteurToMission(IdMission: ID!, IdEnqueteur: ID): Boolean
        # updateUser(IdUser: ID!, group: GROUP,userInfo: userInfo, loginInfo: loginInfo): USER,
        # delete user


        addLieu(region: String!, district:String!) : LIEU,
        updateLieu(IdLieu: ID!,region: String!, district:String!) : LIEU,
        deleteDescente(IdDescente: ID):Boolean,

        addDescente( dateDescente: String!, description: String!): DESCENTE,
        updateDescente(IdDescente: ID! ,dateDescente: String, description: String): DESCENTE,
        deleteLieu(IdLieu: ID): Boolean,

        addMission(commune: String!, fokotany: String!, village: String!, IdDescente: ID!, IdLieu: ID!): MISSION,
        updateMission(IdMission:ID! ,commune: String!, fokotany: String!, village: String!, IdDescente: ID!, IdLieu: ID!): MISSION
        deleteMission:Boolean,
    }
`;



const typeDefs =inputs+types+base;

// module.exports.schemas = mergeTypes(merged, { all: true });
// 
module.exports =  typeDefs;