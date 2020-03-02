/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('aider', {
    IdMOA: {
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
    IDEA: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ea',
        key: 'IdEA'
      }
    }
  }, {
    tableName: 'aider'
  });
};
