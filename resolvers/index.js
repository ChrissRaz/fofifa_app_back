let mutation = require("./mutation");
let query = require("./query");
let unions = require("./unions");
let type = require('./type');
let interfaces = require('./interfaces');



module.exports = {
    ...interfaces,
    ...type,
    ...unions,
    Query: query,
    Mutation: mutation,
};


