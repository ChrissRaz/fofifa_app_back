/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('enquetee', {
    idPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'personne',
        key: 'IdPersonne'
      },
      field: 'IdPersonne'
    },
    age: {
      type: DataTypes.STRING(3),
      allowNull: false,
      field: 'age'
    },
    sexe: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      field: 'sexe'
    },
    nom: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'nom'
    },
    prenom: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: 'prenom'
    }
  }, {
    tableName: 'enquetee'
  });
};
