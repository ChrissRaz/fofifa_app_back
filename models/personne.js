/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('personne', {
    IdPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    age: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    sexe: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    prenom: {
      type: DataTypes.STRING(150),
      allowNull: false
    }
  }, {
    tableName: 'personne'
  });
};
