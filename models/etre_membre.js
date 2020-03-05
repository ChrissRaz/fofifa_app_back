/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('etre_membre', {
    IdAssoc: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'association',
        key: 'IdAssoc'
      }
    },
    IdPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'personne',
        key: 'IdPersonne'
      }
    },
    actif: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'etre_membre'
  });
};
