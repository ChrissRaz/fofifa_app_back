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
    IdEA: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'ea',
        key: 'IdEA'
      }
    },
    date_modif: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'saisir'
  });
};
