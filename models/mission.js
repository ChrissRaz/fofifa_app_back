/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mission', {
    IdMission: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
      }
    },
    IdLieu: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'lieu',
        key: 'IdLieu'
      }
    }
  }, {
    tableName: 'mission'
  });
};
