// const { gql } = require('apollo-server-express');



const {gql} = require('../helpers/helpers');
// const {gql} = require('apollo-server-express');


// import {gql} from ';



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
