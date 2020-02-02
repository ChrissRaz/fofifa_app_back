/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('charger', {
    IdLieu: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'mission',
        key: 'IdLieu'
      }
    },
    IdPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'enqueteur',
        key: 'IdPersonne'
      }
    }
  }, {
    tableName: 'charger'
  });
};
