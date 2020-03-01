/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('param_divers', {
    IdParam: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tableParam: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    codeParam: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    val_param: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status_param: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    tableName: 'param_divers'
  });
};
