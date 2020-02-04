const {gql} = require('../helpers/helpers');
// const {gql} = require('apollo-server-express');



module.exports  =  gql`

    enum GROUP{
        CHERCHEUR
        ENQUETEUR
        SAISISSEUR
    }

    type PERSONNE{
        IdPersonne: ID!,
        nom: String!,
        prenom: String!,
        age: Int,
    }

    interface FOFIFAPERS{
        IdPersonne: ID!,
        # details_personne: PERSONNE!
    }

    type ENQUETEUR implements FOFIFAPERS{
        IdPersonne: ID!,
        # details_personne: PERSONNE!
        # missions:[MISSION]
    }

    type  SAISISSEUR implements  FOFIFAPERS{
        IdPersonne: ID!,
        # details_personne: PERSONNE!
    }

    type  CHERCHEUR implements  FOFIFAPERS{
        IdPersonne: ID!,
        # details_personne: PERSONNE!

    }

    union USER = ENQUETEUR | SAISISSEUR | CHERCHEUR

    type AUTHPAYLOAD{
        token: String!,
        expiration:Int!,
        # user: USER,
    }

    type LIEU{
        IdLieu: ID!,
        region: String!,
        district:String!
        missions:[MISSION]
    }

    type MISSION{
        IdMission: ID!,
        commune: String,
        fokotany: String,
        village: String,
        descente: DESCENTE,
        lieu: LIEU
    }

    type DESCENTE{
        IdDescente: ID!,
        dateDescente: String,
        description: String,
        missions: [MISSION]
    }

`;

