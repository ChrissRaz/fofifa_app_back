const express= require("express");
const graphqlHTTP = require("express-graphql");

const db = require("./helpers/db");

const typeDefs = require("./scemas/schemas");
const model = require("./models/models");

const resolvers = require('./resolvers/index');

const loggingMiddleware = require('./middlewares/login');

const graphqlTools = require('graphql-tools');

var cors = require('cors');

const app = express();

app.use(cors());
app.use(loggingMiddleware);


app.use("/api", graphqlHTTP({
   schema: graphqlTools.makeExecutableSchema({
    typeDefs,
    resolvers
   }),
   graphiql: true,
   context: {
     database: db,
     model:model,
    },
    // rootValue: resolvers,  
}));


app.listen(1200,()=>{
    console.log("🚀 server started on port 1200, the api is available at http://127.0.0.1:1200/api");
});
