const mysql = require("mysql");
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
} = require('graphql');

const { requestPromise } = require("../helpers/helpers");


//database server connection infomation config
const dbConnection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: "",
        database: "formation"
    }
);

//coonection to the the database
dbConnection.connect(
    (error) => {
        if (error) console.log(error);
        else
            console.log("database connected...");
    }
);


//Types for request


const ROOTQUERY = new GraphQLObjectType({
    name: "ROOTQUERY",
    fields: () => (
        {
            
        })
}
);


const MUTATION = new GraphQLObjectType(
    {
        name: "MUTATION",
        fields: () => (
            {
              
            }
        )

    }
);

module.exports = new GraphQLSchema({
    query: ROOTQUERY,
    mutation: MUTATION,
}
);