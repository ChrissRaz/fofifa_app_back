var {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull,
    GraphQLUnionType,
    GraphQLInputObjectType,
    buildSchema 
} = require('graphql');



// const mysql = require("mysql");

const {mutation,descente} = require('../resolvers/mutation');



// const { loadJsonFile } = require("../helpers/helpers");

const query = require('../resolvers/query');

const { requestPromise } = require("../helpers/helpers");





// const PERSONNETYPE = new GraphQLObjectType({
//     name: "PERSONNETYPE",
//     fields: () => ({
//         IdPersonne: { type: GraphQLID },
//         nom: { type: GraphQLString },
//         prenom: {type: GraphQLString},
//         age: {type: GraphQLInt},
//     })
// }
// );

// const CHERCHEURTYPE = new GraphQLObjectType({
//     name: "CHERCHEURTYPE",
//     fields: () => ({
//         IdPersonne : { type: GraphQLID },

//     })
// }
// );

// const SAISISSEURTYPE = new GraphQLObjectType({
//     name: "SAISISSEURTYPE",
//     fields: () => ({
//         IdPersonne : { type: GraphQLID },

//     })
// }
// );

// const ENQUETEURTYPE = new GraphQLObjectType({
//     name: "ENQUETEURTYPE",
//     fields: () => ({
//         IdPersonne : { type: GraphQLID },

//     })
// }
// );

// var FOFIFAPERSTYPE = new GraphQLUnionType({
//     name: 'FOFIFAPERSTYPE',
//     types: [ CHERCHEURTYPE, SAISISSEURTYPE , ENQUETEURTYPE ],
//     resolveType(value) {
//       if (value instanceof CHERCHEURTYPE) {
//         return ;
//       }
//       if (value instanceof SAISISSEURTYPE) {
//         return ;
//       }
//       if (value instanceof ENQUETEURTYPE)
//       {
//         return ;
//       }
//     }
//   });


// const USERTYPE = new GraphQLObjectType({
//     name: "USERTYPE",
//     fields: () => ({
//         IdUser : { type: GraphQLID },
//         details: {type: USERTYPE}

//     })
// }
// );

// const AUTHPAYLOADTYPE = new GraphQLObjectType({
//     name: "AUTHPAYLOADTYPE",
//     fields: () => ({
//         token : { 
//             type: GraphQLID, 
//         },
        
//         user: {type: USERTYPE}
        
//     })
// }
// );


// const DESCENTETYPE = new GraphQLObjectType({
//     name: "DESCENTETYPE",
//     fields: () => ({
//         IdDescente: { type: GraphQLID},
//         dateDescente : { type: GraphQLString },
//         description: {type: GraphQLString}
//         // user: {type: USERTYPE}

//     })
// }
// );


//Types for request
// const ROOTQUERY = new GraphQLObjectType({
//     name: "ROOTQUERY",
//     fields: () => (
//         {
//             descentes:{
//                 type: GraphQLList(DESCENTETYPE),
                
//                 resolve (parent, args){
//                     return query.descentes(parent,args);  
//                 }
//             },

//             descente:{
//                 type: DESCENTETYPE,
//                 args: {
//                     id: {
//                         type: GraphQLID
//                     }
//                 },             
//                 resolve (parent, args, context){

//                     return query.descente(parent,args,context);  
//                 }
//             },

            
//         })
// }
// );


// const MUTATION = new GraphQLObjectType(
//     {
//         name: "MUTATION",
//         fields: () => (
//             {
//               login: {
//                   type: AUTHPAYLOADTYPE,
//                   args:{
//                     username: { type: GraphQLString },
//                     password: { type: GraphQLString },
//                     // userDetails: {type: GraphQLUnionType()}
//                     },
                                     
//                 },

//                 newDescente: 
//                 {
//                     type: DESCENTETYPE,
//                     args:{
//                         date: {
//                             type:GraphQLNonNull(GraphQLString) 
//                         },

//                         description:{ 
//                             type: GraphQLNonNull(GraphQLString)
//                         }
//                     },

//                     resolve(parent,args,context)
//                     {
//                         return descente.descente(parent,args,context);
                    
//                     }
//                 }

                
//             }
//         )

//     }
// );

var schema = buildSchema(`
  type Query {
    hello: String
  }
`);

module.exports.schema = schema;