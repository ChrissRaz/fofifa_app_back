/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('charger', {
    IdCharger: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    IdMission: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'mission',
        key: 'IdMission'
      },
      unique: "CHARGER_MISSION_FK"
    },
    IdPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'enqueteur',
        key: 'IdPersonne'
      },
      unique: "CHARGER_ENQUETEUR_FK"
    }
  }, {
    sequelize,
    tableName: 'charger'
    });
};
