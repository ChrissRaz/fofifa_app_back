/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menage', {
    IdPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'personne',
        key: 'IdPersonne'
      }
    },
    UTA: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "entre 0 et 1"
    },
    UTAAgricole: {
      type: DataTypes.FLOAT,
      allowNull: false,
      comment: "entre 0 et 1"
    },
    presence: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    IdActPcpl: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "MENAGE__PARAM_DIVERS_FK"
    },
    IdActSec: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "MENAGE__PARAM_DIVERS0_FK"
    },
    IdAutrSrcRev: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "MENAGE__PARAM_DIVERS1_FK"
    },
    IdNivAtt: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "MENAGE__PARAM_DIVERS2_FK"
    },
    IdNivAct: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "MENAGE__PARAM_DIVERS3_FK"
    },
    obs_men: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'menage'
    });
};
