const express = require("express");
const graphqlHTTP = require("express-graphql");
const typeDefs = require("./scemas/schemas");
const model = require("./models/models");
const resolvers = require('./resolvers/index');
const graphqlTools = require('graphql-tools');

const loggingMiddleware = require('./middlewares/login');
const cors = require('cors');

const cntts = require('./config/constants');

//
const db = require("./helpers/db");


//variables init
const serverPort = cntts.server.port;
const apiRoute = "/api";


//express app init
const app = express();


//middlewares config
app.use(cors());
app.use(loggingMiddleware);


//graphql congig
let schema = graphqlTools.makeExecutableSchema({
    typeDefs,
    resolvers
});

app.use(apiRoute, graphqlHTTP((request, response, graphQLParams) =>

    ({
        schema: schema,
        graphiql: true,
        context: {
            req: request,
            database: db,
            model: model,
        }
    })

));


//server instantiation
let http = require('http').Server(app);


//launch server
http.listen(serverPort, () => {
    console.log(`🚀 server started on port ${serverPort}, the api is available at http://127.0.0.1:1200${apiRoute}`);
});


const io = require('socket.io').listen(http, {
    origins: '*:*'
});

io.sockets.on('connection', (socket) => {
    console.log('connecté');

    socket.test = "hahah"
    socket.emit('test', { test: socket.test });


    socket.on('disconnect', function () {
        console.log('déconnecté');
    });


});