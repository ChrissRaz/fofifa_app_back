/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('materiel', {
    IdMat: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
      }
    },
    IdEtatMat: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      }
    },
    obs: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'materiel'
  });
};
