var {
    buildSchema ,
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
} = require('graphql')xxx;



// const mysql = require("mysql");

const {mutation,descente,modularite} = require('../resolvers/mutation');



// const { loadJsonFile } = require("../helpers/helpers");

const query = require('../resolvers/query');

const { requestPromise } = require("../helpers/helpers");



const ERRORTYPE = new GraphQLObjectType({
    name: "ERRORTYPE",
    fields: () => ({
        error: {
            type: GraphQLBoolean
        },
        description: {
            type: GraphQLString
        }
    })
}
);

const PERSONNETYPE = new GraphQLObjectType({
    name: "PERSONNETYPE",
    fields: () => ({
        error: false,
        IdPersonne: { type: GraphQLID },
        nom: { type: GraphQLString },
        prenom: {type: GraphQLString},
        age: {type: GraphQLInt},
    })
}
);

const CHERCHEURTYPE = new GraphQLObjectType({
    name: "CHERCHEURTYPE",
    fields: () => ({
        IdPersonne : { type: GraphQLID },

    })
}
);

const SAISISSEURTYPE = new GraphQLObjectType({
    name: "SAISISSEURTYPE",
    fields: () => ({
        IdPersonne : { type: GraphQLID },

    })
}
);

const ENQUETEURTYPE = new GraphQLObjectType({
    name: "ENQUETEURTYPE",
    fields: () => ({
        IdPersonne : { type: GraphQLID },

    })
}
);

var FOFIFAPERSTYPE = new GraphQLUnionType({
    name: 'FOFIFAPERSTYPE',
    types: [ CHERCHEURTYPE, SAISISSEURTYPE , ENQUETEURTYPE ],
    resolveType(value) {
      if (value instanceof CHERCHEURTYPE) {
        return ;
      }
      if (value instanceof SAISISSEURTYPE) {
        return ;
      }
      if (value instanceof ENQUETEURTYPE)
      {
        return ;
      }
    }
  });


const USERTYPE = new GraphQLObjectType({
    name: "USERTYPE",
    fields: () => ({
        IdUser : { type: GraphQLID },
        details: {type: FOFIFAPERSTYPE}

    })
}
);

const AUTHPAYLOADTYPE = new GraphQLObjectType({
    name: "AUTHPAYLOADTYPE",
    fields: () => ({
        token : { 
            type: GraphQLID, 
        },
        
        user: {type: USERTYPE}
        
    })
}
);


const DESCENTETYPE = new GraphQLObjectType({
    name: "DESCENTETYPE",
    fields: () => ({
        IdDescente: { type: GraphQLID},
        dateDescente : { type: GraphQLString },
        description: {type: GraphQLString},
        missions: {type: GraphQLList(MISSIONTYPE)}

    })
}
);

const MISSIONTYPE = new GraphQLObjectType({
    name: "MISSIONTYPE",
    fields: () => ({
        IdMission: { type: GraphQLID},
        commune: { type: GraphQLString},
        fokotany: { type: GraphQLString},
        village: { type: GraphQLString},
        lieu: {type: LIEUTYPE},
        
    })
}
);

const LIEUTYPE = new GraphQLObjectType({
    name: "LIEUTYPE",
    fields: () => ({
        IdLieu: { type: GraphQLID},
        region: { type: GraphQLString},
        disctrict: {type: GraphQLString}

    })
}
);


//Types for request
const ROOTQUERY = new GraphQLObjectType({
    name: "ROOTQUERY",
    fields: () => (
        {
            login: {
                type: AUTHPAYLOADTYPE,
                // type: GraphQLString,
                args:{
                    username: { type:  GraphQLNonNull(GraphQLString) },
                    password: { type: GraphQLNonNull(GraphQLString) },
                    },
                
                    resolve (parent,args,context)  {

                    return query.login(parent,args, context);
                }
                                    
            },

            descentes:{
                type: GraphQLList(DESCENTETYPE),
                args: {
                    token: {
                        type:GraphQLNonNull(GraphQLString)
                    },
                },
                resolve (parent, args, context){
                    return query.descentes(parent,args);  
                }
            },

            descente:{
                type: DESCENTETYPE,
                args: {
                    token: {
                        type:GraphQLNonNull(GraphQLString)
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

                addDescente: 
                {
                    type: DESCENTETYPE,
                    args:{
                        token: {
                            type:GraphQLNonNull(GraphQLString)
                        },

                        date: {
                            type:GraphQLNonNull(GraphQLString) 
                            
                        },

                        description:{ 
                            type: GraphQLNonNull(GraphQLString)
                        }
                    },

                    resolve(parent,args,context)
                    {
                        return descente.addDescente(parent,args,context);
                    
                    }
                },
                addLieu:
                {
                    type: LIEUTYPE,
                    args: {
                        token: {
                            type:GraphQLNonNull(GraphQLString)
                        },

                        region:{
                            type:GraphQLNonNull(GraphQLString)
                        },
                        district:{
                            type:GraphQLNonNull(GraphQLString)
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