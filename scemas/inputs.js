// const { gql } = require('apollo-server-express');

// const {gql} = require('graphql-tag');

const {gql} = require('../helpers/helpers');

// import {gql} from ';



module.exports  =  gql`
    input userInfo
    {
        nom: String!,
        prenom: String!,
        age: Int,
    },
    input loginInfo
    {
        username: String!,
        password: String!,
    }
`;
