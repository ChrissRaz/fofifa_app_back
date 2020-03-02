const load_js_file = require('load-json-file');

let model = require("../models/models");

// const db_connect = require("../helpers/db");


// //this function send request to an connected server
// function requestPromise(dbConnection, query , queryParams=[])
// {

//     return new Promise(function (resolve, reject) {

//         dbConnection.query(query, queryParams, (error, results) => {
//             if (error) {
//                 throw error;
//             }
//             else {
//                 res = JSON.parse(JSON.stringify(results));
//             }
//             resolve(res);
//         });
//     });
// }

//load an JSON File and parse it
// let loadJsonFile = async (filepah)=>{
//     let res = await load_js_file(filepah);
//     return res;
// };

async function saisir(IdPers, IdEA) {
    let res = await model.saisir.findOne({
        raw: true,
        where: {
            IdPersonne: IdPers,
            IdEA: IdEA
        }
    });

    console.log(res);
    
    

    if (res) {  
        model.saisir.update({
            date_modif: (Date.now()/1000) ,
        }, {
            where: {
                IdPersonne: IdPers,
                IdEA: IdEA
            }
        });
    }
    else {

        model.saisir.create({
            IdPersonne: IdPers,
            IdEA: IdEA
        });
    }

}

function gql(schema) {
    return schema;
}

module.exports = {
    gql: gql,
    saisir: saisir
};