/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chercheur', {
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
    tableName: 'chercheur'
  });
};
