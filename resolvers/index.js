let unions = require("./unions");
let type = require('./type');
let interfaces = require('./interfaces');


const user = require("./user");
const descente = require("./descente");
const mission = require("./mission");
const modalite = require("./modalite");
const ea = require("./ea");
const menage = require("./menage");


module.exports = {
    ...interfaces,
    ...type,
    ...unions,

    Query: {
        ...user.Query,
        ...descente.Query,
        ...mission.Query,
        ...modalite.Query,
        ...ea.Query,
        ...menage.Query
    },
    Mutation: {
        ...user.Mutation,
        ...descente.Mutation,
        ...mission.Mutation,
        ...modalite.Mutation,
        ...ea.Mutation,
        ...menage.Mutation
    },
};


