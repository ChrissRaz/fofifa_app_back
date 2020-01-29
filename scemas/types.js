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
} = require('graphql');



module.exports = {

     ERRORTYPE : new GraphQLObjectType({
        name: "ERRORTYPE",
        fields: () => ({
            error: {
                type: GraphQLBoolean,
                
            },
            description: {
                type: GraphQLString
            }
        })
    }
    ),
    
     PERSONNETYPE : new GraphQLObjectType({
        name: "PERSONNETYPE",
        fields: () => ({
            error: { type: GraphQLBoolean},
            IdPersonne: { type: GraphQLID },
            nom: { type: GraphQLString },
            prenom: {type: GraphQLString},
            age: {type: GraphQLInt},
        })
    }
    ),
    
     CHERCHEURTYPE : new GraphQLObjectType({
        name: "CHERCHEURTYPE",
        fields: () => ({
            IdPersonne : { type: GraphQLID },
    
        })
    }
    ),
    
     SAISISSEURTYPE : new GraphQLObjectType({
        name: "SAISISSEURTYPE",
        fields: () => ({
            IdPersonne : { type: GraphQLID },
    
        })
    }
    ),
    
     ENQUETEURTYPE : new GraphQLObjectType({
        name: "ENQUETEURTYPE",
        fields: () => ({
            IdPersonne : { type: GraphQLID },
    
        })
    }
    ),
    
    FOFIFAPERSTYPE : new GraphQLUnionType({
        name: 'FOFIFAPERSTYPE',
        types: [ this.HERCHEURTYPE, this.SAISISSEURTYPE , this.ENQUETEURTYPE ],
        resolveType(value) {
          if (value instanceof this.CHERCHEURTYPE) {
            return ;
          }
          if (value instanceof this.SAISISSEURTYPE) {
            return ;
          }
          if (value instanceof this.ENQUETEURTYPE)
          {
            return ;
          }
        }
      }),
    
    
     USERTYPE : new GraphQLObjectType({
        name: "USERTYPE",
        fields: () => ({
            IdUser : { type: GraphQLID },
            details: {type: this.FOFIFAPERSTYPE}
    
        })
    }
    ),
    
     AUTHPAYLOADTYPE : new GraphQLObjectType({
        name: "AUTHPAYLOADTYPE",
        fields: () => ({
            token : { 
                type: GraphQLID, 
            },
            expirationTime:{
                type: GraphQLInt
            },    
            user: {
                type: this.USERTYPE
            },
    
        })
    }
    ),
    
    
     DESCENTETYPE : new GraphQLObjectType({
        name: "DESCENTETYPE",
        fields: () => ({
            IdDescente: { type: GraphQLID},
            dateDescente : { type: GraphQLString },
            description: {type: GraphQLString},
            
            // missions: {type: GraphQLList(this.MISSIONTYPE)}
    
        })
    }),
    
     MISSIONTYPE : new GraphQLObjectType({
        name: "MISSIONTYPE",
        fields: () => ({
            IdMission: { type: GraphQLID},
            commune: { type: GraphQLString},
            fokotany: { type: GraphQLString},
            village: { type: GraphQLString},
            lieu: {type: this.LIEUTYPE},
            
        })
    }
    ),
    
     LIEUTYPE : new GraphQLObjectType({
        name: "LIEUTYPE",
        fields: () => ({
            IdLieu: { type: GraphQLID},
            region: { type: GraphQLString},
            disctrict: {type: GraphQLString}
    
        })
    }
    )
    
};

