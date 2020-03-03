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
        utaFamilale: Float!,
        utaAgricole: Float!,
        dateEnquete: String!,
        presence: Boolean!,
        obs_men: String,
        IdactivitePricipale: ID,
        IdactiviteSecondaire: ID,
        IdautreSourceRevenu: ID,
        IdnivScolaireAct: ID,
        IdnivScolaireAtteint: ID,
        IdrelatioAvecCE: ID,
    }
`;
