/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vente_terre', {
    IdVT: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    surface: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    recetteVT: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    raison: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    obs: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    IdToposequence: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      }
    }
  }, {
    tableName: 'vente_terre'
  });
};
