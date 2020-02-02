/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lieu', {
    IdLieu: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    region: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    district: {
      type: DataTypes.STRING(75),
      allowNull: false
    }
  }, {
    tableName: 'lieu'
  });
};
