/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('foncier', {
    IdFonc: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
      allowNull: false
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
      }
    },
    IdTypeTopo: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      }
    },
    IdModeTenure: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      }
    },
    IdStatutFoncier: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      }
    },
    IdModeAcquis: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      }
    }
  }, {
    tableName: 'foncier'
  });
};
