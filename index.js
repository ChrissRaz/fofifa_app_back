const express = require("express");
const graphqlHTTP = require("express-graphql");

const db = require("./helpers/db");
const typeDefs = require("./scemas/schemas");
const model = require("./models/models");
const resolvers = require('./resolvers/index');
const graphqlTools = require('graphql-tools');
const loggingMiddleware = require('./middlewares/login');
var cors = require('cors');
const app = express();
app.use(cors());

let schema = graphqlTools.makeExecutableSchema({
    typeDefs,
    resolvers
});

app.use(loggingMiddleware);

app.use("/api", graphqlHTTP((request, response, graphQLParams) =>

    ({
        schema: schema,
        graphiql: true,
        context: {
            req: request,
            database: db,
            model: model,
        }
    })));


app.listen(1200, () => {
    console.log("🚀 server started on port 1200, the api is available at http://127.0.0.1:1200/api");
});
