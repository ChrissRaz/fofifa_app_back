# BACKEND FOFIFA_APP EVOLUTION

## Version 0.1.0

* Mutations:
  * affectSaisisseurToDescente
  * deleteSaisisseurFromDescente
  * deleteEnqueteurFromMission
  * updateUser

* Types:
  * SAISISSEUR{
    ...
descentes: [DESCENTE] 
}

  * USER{
    ...
password: String (Decrypted)
}

* Database and models:
  * Tables and Models:
    * affecter


## Version 0.1.2

**Note: EA:EXPLOITATION AGRICOLE ; PARAM: tout les tables qui ont un clé valeurs comme donnés sont gerées par ce TYPE**

* Mutations:
  * addEA
  * updateEA
  * deleteEA

  * addParam
  * updateParam
  * deleteParam

* Query
  * EAs
  * EA
  * parametres
  * parametre

* Type
  * PARAM
  * PARAM_TYPE
  * ANVANTAGE_NAT
  * MENAGE
  * MOE
  * EA
  * SAISISSEUR {
    ...
     descentes: [DESCENTE]
  }
  
* Database and models:
  * affecter
  * charger
  * ea
  * param_divers
  * menage
  * moe
  * avantage_nat
  * aider
  * avoir_famille
  * saisir

* Bug Fixes:
  * addRegion


## Version 0.1.3

* Mutation
  * addMeange
  * updateEA [Param + Code]

* Query
  * regionsWithAvailableDistrictForDescente [Deleted]
  * regions & region [filtrage added]
  * menages
  * menage

* Type
  * EA {
    ...
    status: [PARAM]
  }

**NB: always import config.sql after importing the new database**


## Version 0.1.5

* Query

  * Parametres [Updated: Query Param + status]

  * Associations
  * Association

* Mutation
  
  * deleteMenage
  * updateMenage
  
  * addAssociation
  * updateAssociation
  * deleteAssociation

  * addAssociationToMenage
  * updateAssociationOfMenage
  * deleteAssociationOfMenage

* Bug fixes

  * Resolvers relatioAvecCE in  MENAGE

* Database and Models

  * association
  * etre_membre

* Types

  * ASSOCIATION {new}
  * ASSOCIATION_PERSONNE {new}
  * MENAGE{
    ...
     assiciations: [ASSOCIATION_PERSONNE] {new}
  }

  * USER and childs {
    ...
    actif: [Boolean] [Type modified]
  }

* enum
  * PARAM_TYPE{
    ...,
    TYPE_OP
  }

## Version 1.7

  * ENUM

    * PARAM_TYPE{
    * ETAT_MAT [new]
    * TYPE_BAT [new]
    * TYPE_CHAMP [new]
    * TYPE_TOPO [new]
    * MODE_TENURE [new]
    * STATUS_FONCIER [new]
    * MODE_ACQUI [new]
    * TYPE_CULT [new]
    * TYPE_CHARGE [new]
    }
  
  * Database and Models
    * materiel
    * batime_agri
    * vente_terre
    * foncier
    * location
    * metayage
    * charge_locataire
    * locataion_avoir_charge_loc
    * metayage_avoir_charge_loc
  
  * Mutations
    * addMOE
    * updateMOE
    * deleteMOE


## Version 1.8
  * add saisisseurs to type DESCENTE
  * 