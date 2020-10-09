/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mission', {
    IdMission: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    commune: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    fokotany: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    village: {
      type: DataTypes.STRING(75),
      allowNull: false
    },
    IdDescente: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'descente',
        key: 'IdDescente'
      },
      unique: "MISSION_DESCENTE0_FK"
    },
    IdLieu: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'lieu',
        key: 'IdLieu'
      },
      unique: "MISSION_LIEU1_FK"
    }
  }, {
    sequelize,
    tableName: 'mission'
    });
};
