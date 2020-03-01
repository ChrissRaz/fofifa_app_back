/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('avantage_nat', {
    IdAvantageNat: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    puAvNat: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    qteAvNat: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    IdPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'moe',
        key: 'IdPersonne'
      }
    }
  }, {
    tableName: 'avantage_nat'
  });
};
