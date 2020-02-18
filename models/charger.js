/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('charger', {
    IdMission: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'mission',
        key: 'IdMission'
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
