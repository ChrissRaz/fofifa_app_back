/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('chercheur', {
    idPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'fofifapers',
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
    },
    username: {
      type: DataTypes.STRING(25),
      allowNull: false,
      field: 'username'
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      field: 'password'
    }
  }, {
    tableName: 'chercheur'
  });
};
