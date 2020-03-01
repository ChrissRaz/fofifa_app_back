/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('moe', {
    IdPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'personne',
        key: 'IdPersonne'
      }
    },
    moisDebut: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    moisFin: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    salaireMens: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    obs_moe: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    IdActPcpl: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      }
    }
  }, {
    tableName: 'moe'
  });
};
