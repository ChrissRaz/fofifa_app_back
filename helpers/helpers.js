const load_js_file = require('load-json-file');
// const db_connect = require("../helpers/db");


//this function send request to an connected server
function requestPromise(dbConnection, query , queryParams=[])
{
    
    return new Promise(function (resolve, reject) {
        
        dbConnection.query(query, queryParams, (error, results) => {
            if (error) {
                throw error;
            }
            else {
                res = JSON.parse(JSON.stringify(results));
            }
            resolve(res);
        });
    });
}

//load an JSON File and parse it
let loadJsonFile = async (filepah)=>{
    let res = await load_js_file(filepah);
    return res;
};

module.exports = {
    requestPromise : requestPromise,
    loadJsonFile: loadJsonFile
};