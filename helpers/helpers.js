//this function send requestion to an connected server
function requestPromise(dbConnection, query, queryParams=[])
{
    return new Promise(function (resolve, reject) {
        
        dbConnection.query(query, queryParams , (error, results) => {
            if (error) {
                console.error(error);
                res = {};
            }
            else {
                res = JSON.parse(JSON.stringify(results));
            }

            resolve(res);

        });
    });
}


module.exports.requestPromise = requestPromise;