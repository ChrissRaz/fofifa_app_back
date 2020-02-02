/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('fofifapers', {
    IdPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'personne',
        key: 'IdPersonne'
      }
    },
    username: {
      type: DataTypes.STRING(25),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'fofifapers'
  });
};
