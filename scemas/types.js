const { gql } = require('../helpers/helpers');


module.exports = gql`

    enum GROUP{
        CHERCHEUR
        ENQUETEUR
        SAISISSEUR
    }

    enum PARAM_TYPE{
        NIVEAU_SCOLAIRE
        TYPE_MAIN_OEUVRE
        TYPE_PARENTE
        ACTIVITE
        TYPE_AVANTAGE_NATURE
        TYPE_OP

        ##news
        ETAT_MAT, 
        TYPE_BAT, 
        TYPE_CHAMP, 
        TYPE_TOPO,
        MODE_TENURE, 
        STATUS_FONCIER, 
        MODE_ACQUI, 
        TYPE_CULT, 
        TYPE_CHARGE, 
        SAISIE_STATUS
    }

    enum CODE_STATUS{
        EN_SAISI
        AT_VALID
        EN_REVIS
        VALIDE
    }

    type PARAM{
        IdParam: ID!,
        table: PARAM_TYPE!,
        code: String,
        val: String!,
        status: Boolean!
    }

    type PERSONNE{
        IdPersonne: ID!,
        nom: String!,
        prenom: String!,
        age: Int,
        sexe: Boolean,
    }

    interface USER{
        IdPersonne: ID!,
        actif: Boolean!,
        username: String!,
        password: String!,
        salt: String!,
        details_personne: PERSONNE!
    }

    type ENQUETEUR implements USER{
        IdPersonne: ID!,
        details_personne: PERSONNE!,
        actif: Boolean!,
        username: String!,
        password: String!,
        salt: String!,
        missions:[MISSION]
    }

    type  SAISISSEUR implements  USER{
        IdPersonne: ID!,
        details_personne: PERSONNE!,
        actif: Boolean!,
        username: String!,
        password: String!,
        salt: String!,
        descentes: [DESCENTE]
    }

    type  CHERCHEUR implements  USER{
        IdPersonne: ID!,
        details_personne: PERSONNE!,
        actif: Boolean!,
        username: String!,
        password: String!,
        salt: String!,
    }

    # union USER = ENQUETEUR | SAISISSEUR | CHERCHEUR

    type AUTHPAYLOAD{
        token: String!,
        expiration: Int!,
        user: USER,
    }

    # type LIEU{
    #     IdLieu: ID!,
    #     region: String!,
    #     district:String!
    #     missions:[MISSION]
    # }


    type DISTRICT{
        IdDistrict: ID!,
        district: String!,
        region: REGION,
        missions:[MISSION]
    }

    type REGION{
        IdRegion: ID!,
        region: String!,
        districts:  [DISTRICT],
    }    

    type MISSION{
        IdMission: ID!,
        commune: String,
        fokotany: String,
        village: String,
        descente: DESCENTE,
        lieu: DISTRICT,
        equipe: [ENQUETEUR]
    }

    type DESCENTE{
        IdDescente: ID!,
        dateDescente: String,
        description: String,
        missions: [MISSION],
        saisisseurs: [SAISISSEUR]
    }

    type ANVANTAGE_NAT{
        IdAvantageNat: ID!,
        puAvNat: Int!,
        qteAvNat: Int!,
        type: PARAM!
    }

    type MENAGE{
        IdPersonne: ID!,
        UTA: Float!,
        UTAAgricole: Float!,
        presence: Boolean!,
        observation: String,
        details_personne: PERSONNE!,
        activitePricipale: PARAM,
        activiteSecondaire: PARAM,
        autreSourceRevenu: PARAM,
        nivScolaireAct: PARAM,
        nivScolaireAtteint: PARAM,
        relatioAvecCE: PARAM!,
        ea: EA,
        associations: [ASSOCIATION_PERSONNE],
    }

    type MOE{
        IdPersonne: ID!,
        moisDebut: String!,
        moisFin: String!,
        salaireMens: Float!,
        observation: String,
        activitePricipale: PARAM,
        details_personne: PERSONNE,
        avantegeNature: [ANVANTAGE_NAT],
        ea: EA
    }

    type EA{
        IdEA: ID!,
        codeEA: String!,
        dateEnquete: String!
        status: PARAM!,
        menages: [MENAGE],
        moes: [MOE],
        fonciers: [FONCIER]
    }

    type ASSOCIATION{
        IdAssoc: ID!,
        nomAssoc: String!,
        type: PARAM!,
    }

    type ASSOCIATION_PERSONNE{
        association: ASSOCIATION!
        actif: Boolean!
    }


    type FONCIER {
        IdFonc: ID!,
        nbParc: Int!,
        denom: String!,
        surface: Float!,
        anneAcquis: String!,
        mode_acqui: PARAM!,
        mntFonc: Float,
        cultive: Boolean!,
        type_champ: PARAM!,
        toposequence: PARAM!,
        mode_tenure: PARAM!,
        statut_foncier: PARAM!,
        observation: String,
        location: [LOCATION],
        metayage: [METAYAGE]
    }

    type LOCATION {
        IdLoc: ID!,
        mntLoc: Float!,
        dureeLoc: Int!,
        nbParc: Int!,
        observation: String,
        chargeLocataire: CHARGE_LOCATAIRE
    }

    type METAYAGE {
        IdMet: ID!,
        pu: Float!,
        qte: Float!,
        dureeMet: Float!,
        nbParc: Int!,
        type_culture: PARAM!,
        observation: String,
        chargeLocataire: CHARGE_LOCATAIRE
    }

    type CHARGE_LOCATAIRE {
        IdChrg: ID!,
        pu: Float!,
        qte: Float,
        unite: String!
    }


    # type STATS {
    #     renteFoncier: 
    # }

    # type RENTE_FONCIER {
    #     Num_EA: ID!
    #     S_Rente_Loc: Float
    #     S_Rente_Loc_Tanety
    #     S_Rente_Loc_Baiboho
    #     S_Rente_Loc_RMME
    #     S_Rente_Loc_RI
    #     S_Rente_Met
    #     S_Rente_Met_Tanety
    #     S_Rente_Met_Baiboho
    #     S_Rente_Met_RMME
    #     S_Rente_Met_RI
    #     V_Foncier_Rente_Loc
    #     V_Foncier_Rente_Met

    # }

`;

