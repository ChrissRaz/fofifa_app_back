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
  