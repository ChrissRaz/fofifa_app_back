/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('enquetee', {
    IdPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'personne',
        key: 'IdPersonne'
      }
    }
  }, {
    tableName: 'enquetee'
  });
};
