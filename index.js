const express= require("express");
const graphqlHTTP = require("express-graphql");
const server = express();
const db = require("./helpers/db");
const {schema} = require("./scemas/schemas");

const model = require("./models/models");
  


server.use("/api", graphqlHTTP({
   schema: schema,
   graphiql: true,
   context: {
     database: db,
     model:model
    }
    
}));

server.listen(1200,()=>{
    console.log("server started on port 1200, the api is available at http://127.0.0.1:1200/api");
});