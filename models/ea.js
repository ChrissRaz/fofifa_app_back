/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ea', {
    IdEA: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    codeEA: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
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
      }
    },
    IdCharger: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'charger',
        key: 'IdCharger'
      }
    }
  }, {
    tableName: 'ea'
  });
};
