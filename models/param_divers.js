/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('param_divers', {
    IdParam: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    tableParam: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    codeParam: {
      type: DataTypes.STRING(10),
      allowNull: true,
      unique: "codeParam"
    },
    val_param: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status_param: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      comment: "controlle de suppression pour historisation en cas de suppression"
    }
  }, {
    sequelize,
    tableName: 'param_divers'
    });
};
