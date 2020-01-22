/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mission', {
    idMission: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'IdMission'
    },
    commune: {
      type: DataTypes.STRING(75),
      allowNull: false,
      field: 'commune'
    },
    fokotany: {
      type: DataTypes.STRING(75),
      allowNull: false,
      field: 'fokotany'
    },
    village: {
      type: DataTypes.STRING(75),
      allowNull: false,
      field: 'village'
    },
    idDescente: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'descente',
        key: 'IdDescente'
      },
      field: 'IdDescente'
    },
    idMissionLieu: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'lieu',
        key: 'idMission'
      },
      field: 'idMission_LIEU'
    }
  }, {
    tableName: 'mission'
  });
};
