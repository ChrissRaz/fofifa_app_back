var {
    // buildSchema ,
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
} = require('graphql');



// const mysql = require("mysql");
const {mutation,descente,modularite} = require('../resolvers/mutation');


const query = require('../resolvers/query');

const tps = require("./types");
const inputs = require("./inputs");



//Types for request
const ROOTQUERY = new GraphQLObjectType({
    name: "ROOTQUERY",
    fields: () => (
        {
            login: {
                type: tps.AUTHPAYLOADTYPE,
                // type: GraphQLString,
                args:{
                    username: { type:   GraphQLNonNull(GraphQLString) },
                    password: { type:  GraphQLNonNull(GraphQLString) },
                    },
                
                    resolve (parent,args,context)  {

                    return query.login(parent,args, context);
                }
                                    
            },

            descentes:{
                type:  GraphQLList(tps.DESCENTETYPE),
                // type: GraphQLString,
                args: {
                    token: {
                        type:  GraphQLNonNull(GraphQLString)
                    },
                },
                resolve (parent, args, context){
                    return query.descentes(parent,args);  
                }
            },

            descente:{
                type: tps.DESCENTETYPE,
                // type: GraphQLString,
                args: {
                    token: {
                        type:  GraphQLNonNull(GraphQLString)
                    },

                    id: {
                        type: GraphQLID
                    }
                },             
                resolve (parent, args, context){

                    return query.descente(parent,args,context);  
                }
            },

            
        })
}
);


const MUTATION = new GraphQLObjectType(
    {
        name: "MUTATION",
        fields: () => (
            {

                signEqueteur: 
                {
                    type: tps.DESCENTETYPE,
                    // type: GraphQLString,
                    args:{
                        info: {
                            type:inputs.CHERCHEURINPUT
                        }
                    },

                    resolve(parent,args,context)
                    {
                        mutation.user.addUser(parent,args,context);
                    }
                },

                addDescente: 
                {
                    type: tps.DESCENTETYPE,
                    // type: GraphQLString,
                    args:{
                        token: {
                            type:  GraphQLNonNull(GraphQLString)
                        },

                        date: {
                            type:  GraphQLNonNull(GraphQLString) 
                            
                        },

                        description:{ 
                            type:  GraphQLNonNull(GraphQLString)
                        }
                    },

                    resolve(parent,args,context)
                    {
                        return descente.addDescente(parent,args,context);
                    
                    }
                },
                addLieu:
                {
                    type: tps.LIEUTYPE,
                    // type: GraphQLString,
                    args: {
                        token: {
                            type:  GraphQLNonNull(GraphQLString)
                        },

                        region:{
                            type:  GraphQLNonNull(GraphQLString)
                        },
                        district:{
                            type:  GraphQLNonNull(GraphQLString)
                        }
                    },
                    resolve(parent,args,context)
                    {
                        return modularite.addLieu(parent,args,context);
                    
                    }
                }

                
            }
        )

    }
);

// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `);

module.exports.schema = new GraphQLSchema({
  query: ROOTQUERY,
  mutation: MUTATION,
});