let affecter = require('./affecter');
let aider = require("./aider");
let association = require("./association");
let avantage_nat = require("./avantage_nat");
let avoir_famille = require("./avoir_famille");
let charger = require("./charger");
let chercheur = require("./chercheur");
let descente = require("./descente");
let EA =require("./ea");
let enqueteur = require("./enqueteur");
let etre_membre = require('./etre_membre');
let fofifapers = require("./fofifapers");
let lieu = require("./lieu");
let menage = require('./menage');
let mission = require("./mission");
let moe = require("./moe");
let param_divers = require("./param_divers");
let personne = require("./personne");
let saisir = require("./saisir");
let saisisseur = require("./saisisseur");
let batiment_agricole = require('./batiment_agri');
let charge_locataire = require("./charge_locataire");
let foncier = require("./foncier");
let location_avoir_charge_loc = require("./location_avoir_charge_locataire");
let location = require("./location");
let metayage_avoir_charge_loc = require("./metayage_avoir_charge_loc");
let metayage = require("./metayage");
let vente_terre = require("./vente_terre");


const {DataTypes} = require('sequelize');
const db = require("../helpers/db");


// sequelize-auto -h localhost -d fofifa -u root  --dialect mysql -o models 


module.exports = {
    affecter: affecter(db,DataTypes),
    aider: aider(db,DataTypes),
    association: association(db,DataTypes),
    avantage_nat: avantage_nat(db,DataTypes),
    avoir_famille: avoir_famille(db,DataTypes),
    fofifapers: fofifapers(db,DataTypes),
    chercheur: chercheur(db,DataTypes),
    EA: EA(db,DataTypes),
    enqueteur: enqueteur(db,DataTypes),
    etre_membre: etre_membre(db,DataTypes),
    menage: menage(db,DataTypes),
    saisisseur: saisisseur(db,DataTypes),
    lieu: lieu(db,DataTypes),
    descente: descente(db,DataTypes),
    mission: mission(db,DataTypes),
    moe: moe(db,DataTypes),
    param_divers: param_divers(db,DataTypes),
    saisir: saisir(db,DataTypes),
    personne: personne(db,DataTypes),
    charger: charger(db,DataTypes),
};






