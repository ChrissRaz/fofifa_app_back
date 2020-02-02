const cnts = require("../config/constants");

module.exports= {
    USER: class {
        constructor(obj) {
            this.obj = obj;
          }

        __resolveType (obj){
            console.log("woooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooork",obj);
            
            return obj.group;

            // if(obj.group==cnts.CHERCHEURCODE)
            // {
            //     return "CHERCHEUR"; 
            // }
            // else if (obj.group==cnts.ENQUETEURCODE)
            // {
            //     return "ENQUETEUR";
            // }
            // else if(obj.group==cnts.SAISISSEURCODE)
            // {
            //     return "SAISISSEUR";
            // }
            // else
            // {
            //     return null;
            // }
        }
    },

};
