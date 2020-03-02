## Version 0.1.0

* Mutations:
  * affectSaisisseurToDescente
  * deleteSaisisseurFromDescente
  * deleteEnqueteurFromMission
  * updateUser

* Types:
  * SAISISSEUR{
		...,
		descentes: [DESCENTE]
	}	

  * USER{

		password: String (Decrypted)
	}

  * Database and models:
    * Tables and Models:
	* affecter

## Version 0.1.2

Note: EA = EXPLOITATION AGRICOLE

* Mutations:
  * addEA
  * updateEA
  * deleteEA

* Query
  * EAs 
  * EA
  
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


		