var {
    buildSchema,
} = require('graphql');

// const { gql } = require('apollo-server-express');
const {gql} = require('../helpers/helpers');


// const gql  = require('graphql-tag');

const types = require("./types");
const inputs = require("./inputs");


module.exports.schema = buildSchema(
  types+inputs+
  gql` 
    type Query {
        login(username: String!, password: String!): AUTHPAYLOAD,
      }
      
    type Mutation{
        newUser(group: GROUP): USER,
        addLieu(region: String!, district:String!) : LIEU
        addDescente( dateDescente: String!, description: String!): DESCENTE,
        addMission(commune: String, fokotany: String, village: String, IdDescente: ID, IdLieu: ID): MISSION
    }
  `
 )
  
;