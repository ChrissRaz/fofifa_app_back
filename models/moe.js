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
