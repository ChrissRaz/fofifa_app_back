/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('charge_locataire', {
    IdChrg: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
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
    },
    IdAaction: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'metayage',
        key: 'IdMet'
      },
      unique: "MATAYAGE_CHARGE_FK"
    }
  }, {
    sequelize,
    tableName: 'charge_locataire'
    });
};
