/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('metayage_avoir_charge_loc', {
    IdChrg: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'metayage',
        key: 'IdMet'
      }
    },
    IdMet: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'charge_locataire',
        key: 'IdChrg'
      }
    }
  }, {
    tableName: 'metayage_avoir_charge_loc'
  });
};
