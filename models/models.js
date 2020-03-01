let affecter = require('./affecter');
let aider = require("./aider");
let avantage_nat = require("./avantage_nat");
let avoir_famille = require("./avoir_famille");
let charger = require("./charger");
let chercheur = require("./chercheur");
let descente = require("./descente");
let EA =require("./ea");
let enqueteur = require("./enqueteur");
let fofifapers = require("./fofifapers");
let lieu = require("./lieu");
let menage = require('./menage');
let mission = require("./mission");
let moe = require("./moe");
let param_divers = require("./param_divers");
let personne = require("./personne");
let saisir = require("./saisir");
let saisisseur = require("./saisisseur");


const {DataTypes} = require('sequelize');
const db = require("../helpers/db");


// sequelize-auto -h <host> -d <database> -u <user> -x [password] -p [port]  --dialect mysql -o models 


module.exports = {
    affecter: affecter(db,DataTypes),
    aider: aider(db,DataTypes),
    avantage_nat: avantage_nat(db,DataTypes),
    avoir_famille: avoir_famille(db,DataTypes),
    fofifapers: fofifapers(db,DataTypes),
    chercheur: chercheur(db,DataTypes),
    EA: EA(db,DataTypes),
    enqueteur: enqueteur(db,DataTypes),
    menage: menage(db,DataTypes),
    saisisseur: saisisseur(db,DataTypes),
    lieu: lieu(db,DataTypes),
    descente: descente(db,DataTypes),
    mission: mission(db,DataTypes),
    moe: moe(db,DataTypes),
    param_divers: param_divers(db,DataTypes),
    saisir: saisir+(db,DataTypes),
    personne: personne(db,DataTypes),
    charger: charger(db,DataTypes)    ,
};






