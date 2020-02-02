const {
    GraphQLString,
    GraphQLBoolean,
    
} = require('graphql');


module.exports = `
            type error {
                code: Int!,
                description: String!,
            }`;