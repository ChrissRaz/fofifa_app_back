let charger = require("./charger");
let chercheur = require("./chercheur");
let descente = require("./descente");
let enquetee = require("./enquetee");
let enqueteur = require("./enqueteur");
let fofifapers = require("./fofifapers");
let lieu = require("./lieu");
let mission = require("./mission");
let personne = require("./personne");
let saisisseur = require("./saisisseur");
let affecter = require('./affecter');


const {DataTypes} = require('sequelize');
const db = require("../helpers/db");


// sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port]  --dialect mysql -o models 


module.exports = {
    fofifapers: fofifapers(db,DataTypes),
    chercheur: chercheur(db,DataTypes),
    enqueteur: enqueteur(db,DataTypes),
    saisisseur: saisisseur(db,DataTypes),
    lieu: lieu(db,DataTypes),
    descente: descente(db,DataTypes),
    mission: mission(db,DataTypes),
    personne: personne(db,DataTypes),
    charger: charger(db,DataTypes)    ,
    affecter: affecter(db,DataTypes)
};






