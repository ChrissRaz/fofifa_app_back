/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('location', {
    IdLoc: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    mntLoc: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    dureeLoc: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    nbParc: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    obs: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    IdFoncier: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "LOCATION_FONCIER"
    }
  }, {
    sequelize,
    tableName: 'location'
    });
};
