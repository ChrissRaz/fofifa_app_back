const {gql} = require('../helpers/helpers');

    
module.exports  = gql`
    input userInfo
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
    }
`;
