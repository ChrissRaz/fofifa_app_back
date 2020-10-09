/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ea', {
    IdEA: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    codeEA: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "codeEA"
    },
    dateEnquete: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    IdStatus: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "EA_STATUS_FK"
    },
    IdCharger: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'charger',
        key: 'IdCharger'
      },
      unique: "EA_CHARGER_FK"
    }
  }, {
    sequelize,
    tableName: 'ea'
    });
};
