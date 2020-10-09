/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('materiel', {
    IdMat: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    qteMat: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    anneAch: {
      type: "YEAR(4)",
      allowNull: false
    },
    puAch: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    coutEntr: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    dureeVie: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    IdTypeMat: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "MATERIEL_TYPE_FK"
    },
    IdEtatMat: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "MATERIEL_ETAT_FK"
    },
    obs: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'materiel'
    });
};
