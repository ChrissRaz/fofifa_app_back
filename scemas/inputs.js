const {gql} = require('../helpers/helpers');

    
module.exports  = gql`

    input userInfo
    {
        nom: String!,
        prenom: String!,
        sexe: Boolean!,
        age: Int,
    },

    input personneInfo
    {
        nom: String!,
        prenom: String!,
        sexe: Boolean!,
        age: Int,
    },

    input loginInfo
    {
        username: String!,
        password: String!,
    },

    input menage 
    {
        details_personne: personneInfo!,
        UTA: Float!,
        UTAAgricole: Float!,
        presence: Boolean!,
        observation: String,
        IdActPcpl: ID,
        IdActSec: ID,
        IdAutrSrcRev: ID,
        IdNivAtt: ID,
        IdNivAct: ID,
        IdRelAvecCE: ID!,
    }

    input avantage_nat
    {
        IdAvNat: ID,
        puAvNat: Float!,
        qteAvNat: Float!,
        type: ID!,
    }
`;
