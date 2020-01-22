/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lieu', {
    idLieu: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'idLieu'
    },
    region: {
      type: DataTypes.STRING(75),
      allowNull: false,
      field: 'Region'
    },
    district: {
      type: DataTypes.STRING(75),
      allowNull: false,
      field: 'district'
    }
  }, {
    tableName: 'lieu'
  });
};
