/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('foncier', {
    IdFonc: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    nbParc: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    denom: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    surface: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    anneAcquis: {
      type: "YEAR(4)",
      allowNull: false
    },
    mntFonc: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    cultive: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    IdTypeChamp: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "FONCIER_TYPE_CHAMP_FK"
    },
    IdTypeTopo: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "FONCIER_TOPO_FK"
    },
    IdModeTenure: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "FONCIER_TENURE_FK"
    },
    IdStatutFoncier: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "FONCIER_STATUT_FK"
    },
    IdModeAcquis: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "FONCIER_MODE_AQUI"
    },
    IdEA: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'ea',
        key: 'IdEA'
      },
      unique: "foncier_ibfk_1"
    }
  }, {
    sequelize,
    tableName: 'foncier'
    });
};
