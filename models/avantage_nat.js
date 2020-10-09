/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('avantage_nat', {
    IdAvNat: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    puAvNat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    qteAvNat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    IdtypeAvNat: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "AVANTAGE_NAT_TYPE_FK"
    },
    IdPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'moe',
        key: 'IdPersonne'
      },
      unique: "AVANTAGE_NAT_MOE_FK"
    }
  }, {
    sequelize,
    tableName: 'avantage_nat'
    });
};
