/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('saisisseur', {
    IdPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'fofifapers',
        key: 'IdPersonne'
      }
    }
  }, {
    tableName: 'saisisseur'
  });
};
