const express= require("express");
const graphqlHTTP = require("express-graphql");


const server = express();

const {schema} = require("./scemas/schemas");

var root = {
    hello: () => {
      return 'Hello world!';
    },
  };


server.use("/api", graphqlHTTP({
   schema: schema,
   graphiql: true,
   rootValue: root
}) );

server.listen(1200,()=>{
    console.log("server started on port 1200, the api is available at http://127.0.0.1:1200/api");
});