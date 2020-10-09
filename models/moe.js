/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('moe', {
    IdPersonne: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'personne',
        key: 'IdPersonne'
      }
    },
    moisDebut: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    moisFin: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    salaireMens: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    obs_moe: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    IdActPcpl: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "_MOE__PARAM_DIVERS0_FK"
    },
    IdTypMOE: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      },
      unique: "MOE_TYPE_MOE"
    },
    IdEA: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'ea',
        key: 'IdEA'
      },
      unique: "MOE_EA_FK"
    }
  }, {
    sequelize,
    tableName: 'moe'
    });
};
