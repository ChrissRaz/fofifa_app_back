/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('batiment_agri', {
    IdBat: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    surface: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    anneConstruct: {
      type: "YEAR(4)",
      allowNull: false
    },
    prixConstruct: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    coutEtretien: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    IdTypeBatiment: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "BATIMENT_TYPE_FK"
    },
    obs: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'batiment_agri'
    });
};
