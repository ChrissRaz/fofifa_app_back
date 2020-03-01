/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('saisir', {
    IdPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'fofifapers',
        key: 'IdPersonne'
      }
    },
    IDEA: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ea',
        key: 'IDEA'
      }
    },
    date_modif: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    tableName: 'saisir'
  });
};
