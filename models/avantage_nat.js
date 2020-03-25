/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('avantage_nat', {
    IdAvNat: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
      }
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
