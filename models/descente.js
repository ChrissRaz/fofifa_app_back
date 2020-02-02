/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('descente', {
    IdDescente: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    dateDescente: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'descente'
  });
};
