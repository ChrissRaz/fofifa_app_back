/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('charge_locataire', {
    IdChrg: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pu: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    qte: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    unite: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    tableName: 'charge_locataire'
  });
};
