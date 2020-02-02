const express= require("express");
const graphqlHTTP = require("express-graphql");
const { ApolloServer, gql} = require('apollo-server-express');


const db = require("./helpers/db");

const {schema} = require("./scemas/schemas");
const model = require("./models/models");

const root = require('./resolvers/index');

const loggingMiddleware = require('./middlewares/login');




// const server = new ApolloServer({typeDefs,test2});
const app = express();

  


app.use(loggingMiddleware);


app.use("/api", graphqlHTTP({
   schema: schema,
   graphiql: true,
   context: {
     database: db,
     model:model,
    },
    rootValue: root,  
}));


app.listen(1200,()=>{
    console.log("server started on port 1200, the api is available at http://127.0.0.1:1200/api");
});


// server.listen(1200).then(({ url }) => {
//   console.log(`🚀  Server ready at ${url}`);
// });


//une autre manière 

// const app = express();
// server.applyMiddleware({ app });

// app.use("/api",server);


// app.listen({ port: 4000 }, () =>
//   console.log(`🚀  Server ready at http://localhost:4000` + server.graphqlPath)
// );