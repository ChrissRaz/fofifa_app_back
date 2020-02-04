let mutation = require("./mutation");
let query = require("./query");
let unions = require("./unions");
let type = require('./type');


module.exports = {
    ...type,
    ...unions,
    Query: query,
    Mutation: mutation,
};


