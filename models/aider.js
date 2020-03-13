/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('aider', {
    IdMOE: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'moe',
        key: 'IdPersonne'
      }
    },
    IdTypMOE: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      }
    },
    IdEA: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ea',
        key: 'IdEA'
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
      type: DataTypes.FLOAT,
      allowNull: false
    },
    obs_moe: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'aider'
  });
};
