const express= require("express");
const graphqlHTTP = require("express-graphql");


const server = express();

const Scema = require("./Scemas/Scemas");


server.use("/api", graphqlHTTP({
   schema: Scema,
   graphiql: true
}) );

server.listen(1200,()=>{
    console.log("server start listening on port 1200");
});