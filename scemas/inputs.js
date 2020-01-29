const {
    GraphQLInputObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLBoolean,
    GraphQLNonNull,
} = require('graphql');


module.exports = {
    PERSONNEINPUT: new GraphQLInputObjectType(
        {
            name: "PERSONNEINPUT",
            fields : () =>({
                age:{
                    type:  GraphQLNonNull(GraphQLInt),
                },
                sexe:{
                    type:  GraphQLNonNull(GraphQLBoolean),
                },
                nom:{
                    type:  GraphQLNonNull(GraphQLString),
                },
                prenom:{
                    type:  GraphQLNonNull(GraphQLString),
                },
            })
        }
    ),

    USERINFOINPUT: new GraphQLInputObjectType(
        {
            name: "USERINFOINPUT",
            fields : () =>({
                username:{
                    type:  GraphQLNonNull(GraphQLString),
                },
                password:{
                    type:  GraphQLNonNull(GraphQLString),
                },
            })
        }
    ),

    CHERCHEURINPUT: new GraphQLInputObjectType(
        {
            name: "CHERCHEURINPUT",
            fields : () =>({
               details: {
                  type: this.PERSONNEINPUT
                },
               userInfo: {
                type: this.USERINFOINPUT
              },
            })
        }
    ),

    ENQUETEURINPUT: new GraphQLInputObjectType(
        {
            name: "ENQUETEURINPUT",
            fields : () =>({
               details: {
                  type: this.PERSONNEINPUT
                },
               userInfo: {
                type: this.USERINFOINPUT
              },
            })
        }
    ),

    SAISSISSEURINPUT: new GraphQLInputObjectType(
        {
            name: "SAISISSEURINPUT",
            fields : () =>({
                details: {
                    type: this.PERSONNEINPUT
                  },
                 userInfo: {
                  type: this.USERINFOINPUT
                },
            })
        }
    ),
};