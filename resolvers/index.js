let mutation = require("./mutation");
let query = require("./query");
let unions = require("./unions");


module.exports = {
    ...unions,
    ...query,
    ...mutation,
};


