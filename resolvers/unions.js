const cnts = require("../config/constants");

module.exports= {
    USER: {
        __resolveType (obj){
            return obj.group;
        }
    },

};
