const express = require("express");
const model = require("../models/models");

const db = require("../helpers/db");

const seq = require('sequelize');


var snakeCase = require('to-snake-case');

function ruleOfTree(one, two, three) {

    let res = (three * two) / one;

    console.log(res);

    return res;
}


//@ts-check
const router = express.Router();

/**
 * 
 */
router.get('/export/:IDD', async (req, res, next) => {

    // if (!req.auth.connected) {
    //     throw new Error(msg.notConnectedUser);
    // }

    let IdDescente = req.params.IDD;

    let cols = ["Code_EA"];

    let top_param_type = "TYPE_TOPO";

    let prefixLocation = "Rente_Loc_";

    let prefixMetayage = "Rente_Met_";


    let EAs = [];

    let toposequences = [];

    let datas = [];




    //find all toposequences
    toposequences = await model.param_divers.findAll({
        where: {
            tableParam: top_param_type
        },
        raw: true
    });

    //cols formation Location
    toposequences.forEach(el => {
        cols.push("S_Rente_Loc_" + snakeCase(el.val_param));
    });


    // cols formation metayage
    toposequences.forEach(el => {
        cols.push("S_Rente_Met_" + snakeCase(el.val_param));
    });

    //rente cols
    cols.push("V_Foncier_Rent_Loc", "V_Foncier_Rent_Met");


    //find all EA for Descente
    EAs = await db.query(`SELECT ea.* FROM ea INNER JOIN charger as ch ON ch.IdCharger=ea.IdCharger INNER JOIN mission as miss ON miss.IdMission=ch.IdMission INNER JOIN descente as des ON des.IdDescente=miss.IdDescente WHERE des.IdDescente=:idd`, {
        replacements: {
            idd: IdDescente
        }, type: seq.QueryTypes.SELECT
    });

    //find location of EA's foncier, metayages, locations
    for (let i = 0; i < EAs.length; i++) {
        const el = EAs[i];

        let locations = await db.query(`       
            SELECT loc.*, fon.IdTypeTopo , fon.surface , fon.nbParc as fonNbParc  FROM ea
            INNER JOIN foncier as fon ON fon.IdEA = ea.IdEA
            INNER JOIN location as loc ON loc.IdFoncier = fon.IdFonc
            WHERE ea.IdEA = :IDEA
        `, {
            replacements: {
                IDEA: el.IdEA
            }, type: seq.QueryTypes.SELECT
        });

        let metayages = await db.query(`       
            SELECT met.* , fon.IdTypeTopo, fon.surface , fon.nbParc as fonNbParc FROM ea 
            INNER JOIN foncier as fon ON fon.IdEA=ea.IdEA 
            INNER JOIN metayage as met ON met.IdFoncier=fon.IdFonc 
            WHERE ea.IdEA = :IDEA
        `, {
            replacements: {
                IDEA: el.IdEA
            }, type: seq.QueryTypes.SELECT
        });


        let fonciers = await db.query(`SELECT fon.* FROM ea INNER JOIN foncier as fon ON fon.IdEA = ea.IdEA WHERE ea.IdEA = :IDEA`, {
            replacements: {
                IDEA: el.IdEA
            }, type: seq.QueryTypes.SELECT
        });

        EAs[i].locations = locations;
        EAs[i].metayages = metayages;
        EAs[i].fonciers = fonciers;

    }

    //algo croisement rente Location, Metayage
    EAs.forEach(el => {

        let renteLoc = 0;
        let renteMet = 0;


        //location
        el.locations.forEach(loc => {

            renteLoc += loc.mntLoc;
        });

        //metayage
        el.metayages.forEach(met => {
            renteMet += met.pu * met.qte;
        });

        el.renteLoc = renteLoc;
        el.renteMet = renteMet;

    });


    // croiement surfaces
    EAs.forEach(el => {
        let line = {};

        line["Code_EA"] = el.codeEA;

        //location
        toposequences.forEach(topo => {

            // console.log("location");
            // console.log(topo);

            let locSum = 0;


            el.locations.forEach(loc => {

                // console.log(loc.IdTypeTopo);

                if (loc.IdTypeTopo == topo.IdParam) {
                    locSum += ruleOfTree(loc.fonNbParc, loc.surface, loc.nbParc);
                }
            });

            line["S_Rente_Loc_" + snakeCase(topo.val_param)] = locSum;
        });

        //metayage
        toposequences.forEach(topo => {
            let metSum = 0;

            // console.log("metayage");
            // console.log(topo);

            el.metayages.forEach(met => {
                // console.log(met.IdTypeTopo);
                if (met.IdTypeTopo == topo.IdParam) {
                    metSum += ruleOfTree(met.fonNbParc, met.surface, met.nbParc);
                }
            });

            line["S_Rente_Met_" + snakeCase(topo.val_param)] = metSum;
        });


        datas.push(line);

    });


    //merge final
    datas.forEach((el, i) => {
        el["V_Foncier_Rent_Loc"] = EAs[i].renteLoc;
        el["V_Foncier_Rent_Met"] = EAs[i].renteMet;
    });

    res.json({ cols, datas });

});


module.exports = router;