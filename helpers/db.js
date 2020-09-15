// const mysql = require("mysql");
const Sequelize = require('sequelize');

const { connexion } = require("../config/database");



const sequelize = new Sequelize(connexion.database, connexion.user, connexion.password, {
  host: connexion.host,
  dialect: 'mysql',
  define: {
    createdAt: false,
    updatedAt: false
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection à base de données établie.');
  })
  .catch(err => {
    console.error('Impossible de se connecter à la base de données:', err);
  });


module.exports = sequelize;