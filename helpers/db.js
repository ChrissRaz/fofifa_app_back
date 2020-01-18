const mysql = require("mysql");
const Sequelize = require('sequelize');

const  {connexion} = require("../config/database");

// database server connection infomation config
const dbConnection = mysql.createConnection(
    {
        host: connexion.host,
        user: connexion.user,
        password: connexion.password,
        database: connexion.database
    }
);

//coonection to the the database
dbConnection.connect(
    (error) => {
        if (error) throw error;
        else
            console.log("database connected...");
    }
);



// Option 1: Passing parameters separately
const sequelize = new Sequelize(connexion.database, connexion.user, connexion.password, {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });


module.exports = dbConnection;