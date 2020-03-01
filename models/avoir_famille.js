/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('avoir_famille', {
    IdPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'menage',
        key: 'IdPersonne'
      }
    },
    IDEA: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ea',
        key: 'IDEA'
      }
    },
    IdRelaCE: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      }
    }
  }, {
    tableName: 'avoir_famille'
  });
};
