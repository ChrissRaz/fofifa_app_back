
/**
 * 1: auth no valid
 * 2: permission denided
 * 3:database error 
 */



module.exports = {
    auth:  {
        error:1,
        description:"Utilisateur no authentifié"
    },

    permission: {
        error:2,
        description:"l'utilisateur n'a pas le droit à ce fonctionalité"
    },

    database: {
        error:3,
        description:"Connexion à la base de donné perdue"
    },

};