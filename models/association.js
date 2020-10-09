/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('association', {
    IdAssoc: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    nomAssoc: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    IdType: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "ASSOCITION_TYPE_FK"
    }
  }, {
    sequelize,
    tableName: 'association'
    });
};
