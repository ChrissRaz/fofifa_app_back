/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('descente', {
    idDescente: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'IdDescente'
    },
    dateDescente: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'dateDescente'
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'description'
    }
  }, {
    tableName: 'descente'
  });
};
