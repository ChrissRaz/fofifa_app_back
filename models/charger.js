/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('charger', {
    idMission: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'mission',
        key: 'IdMission'
      },
      field: 'IdMission'
    },
    idPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'enqueteur',
        key: 'IdPersonne'
      },
      field: 'IdPersonne'
    }
  }, {
    tableName: 'charger'
  });
};
