var {
    buildSchema,
} = require('graphql');

// const { gql } = require('apollo-server-express');

// const {mergeTypes}= require('merge-graphql-schemas');
const {gql} = require('../helpers/helpers');
const types = require("./types");
const inputs = require("./inputs");


const base = gql` 


    type Query {
        login(username: String!, password: String!): AUTHPAYLOAD,
        descentes:[DESCENTE],
        lieux:[LIEU],
        missions:[MISSION]
    }
      
    type Mutation{
        newUser(group: GROUP,userInfo: userInfo, loginInfo: loginInfo): USER,

        addLieu(region: String!, district:String!) : LIEU,
        updateLieu(IdLieu: ID,region: String!, district:String!) : LIEU,

        addDescente( dateDescente: String!, description: String!): DESCENTE,
        updateDescente(IdDescente: ID! ,dateDescente: String, description: String): DESCENTE,

        addMission(commune: String, fokotany: String, village: String, IdDescente: ID, IdLieu: ID): MISSION,
        updateMission(IdMission:ID ,commune: String, fokotany: String, village: String, IdDescente: ID, IdLieu: ID): MISSION
    }
`;



const typeDefs =inputs+types+base;

// module.exports.schemas = mergeTypes(merged, { all: true });
// 
module.exports =  typeDefs;