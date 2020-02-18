/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('lieu', {
    IdLieu: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    descriLieu: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    IdRegion: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'lieu',
        key: 'IdLieu'
      }
    }
  }, {
    tableName: 'lieu'
  });
};
