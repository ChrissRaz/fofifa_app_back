/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('location_avoir_charge_locataire', {
    IdChrg: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'charge_locataire',
        key: 'IdChrg'
      }
    },
    IdLoc: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'location',
        key: 'IdLoc'
      }
    }
  }, {
    tableName: 'location_avoir_charge_locataire'
  });
};
