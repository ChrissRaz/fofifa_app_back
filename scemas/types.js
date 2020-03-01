const {gql} = require('../helpers/helpers');
// const {gql} = require('apollo-server-express');



module.exports  =  gql`

    enum GROUP{
        CHERCHEUR
        ENQUETEUR
        SAISISSEUR
    }

    enum PARAM_TYPE{
        NIVEAU_SCOLAIRE
        TYPE_MAIN_OEUVRE
        TYPE_PARENTE
        ACTIVITE
    }

    type PARAM{
        IdParam: ID!,
        table: PARAM_TYPE!,
        code: String,
        val: String!,
        status: Boolean!
    }

    type PERSONNE{
        IdPersonne: ID!,
        nom: String!,
        prenom: String!,
        age: Int,
    }

    interface USER{
        IdPersonne: ID!,
        actif: Int!,
        username: String!,
        password: String!,
        salt: String!,
        details_personne: PERSONNE!
    }

    type ENQUETEUR implements USER{
        IdPersonne: ID!,
        details_personne: PERSONNE!,
        actif: Int!,
        username: String!,
        password: String!,
        salt: String!,
        missions:[MISSION]
    }

    type  SAISISSEUR implements  USER{
        IdPersonne: ID!,
        details_personne: PERSONNE!,
        actif: Int!,
        username: String!,
        password: String!,
        salt: String!,
        descentes: [DESCENTE]
    }

    type  CHERCHEUR implements  USER{
        IdPersonne: ID!,
        details_personne: PERSONNE!,
        actif: Int!,
        username: String!,
        password: String!,
        salt: String!,
    }

    # union USER = ENQUETEUR | SAISISSEUR | CHERCHEUR

    type AUTHPAYLOAD{
        token: String!,
        expiration: Int!,
        user: USER,
    }

    # type LIEU{
    #     IdLieu: ID!,
    #     region: String!,
    #     district:String!
    #     missions:[MISSION]
    # }


    type DISTRICT{
        IdDistrict: ID!,
        district: String!,
        region: REGION,
        missions:[MISSION]
    }

    type REGION{
        IdRegion: ID!,
        region: String!,
        districts:  [DISTRICT],
    }    

    type MISSION{
        IdMission: ID!,
        commune: String,
        fokotany: String,
        village: String,
        descente: DESCENTE,
        lieu: DISTRICT,
        equipe: [ENQUETEUR]
    }

    type DESCENTE{
        IdDescente: ID!,
        dateDescente: String,
        description: String,
        missions: [MISSION]
    }

`;

