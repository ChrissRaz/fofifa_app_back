/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('affecter', {
    IdDescente: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'descente',
        key: 'IdDescente'
      }
    },
    IdPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'saisisseur',
        key: 'IdPersonne'
      }
    }
  }, {
    tableName: 'affecter'
  });
};
