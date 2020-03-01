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
    utaFamiliale: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    utaAgricole: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    autreRessRev: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    dateEnquete: {
      type: DataTypes.DATEONLY,
      allowNull: false
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
      }
    },
    IdActSec: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      }
    },
    IdAutrSrcRev: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      }
    },
    IdNivAtt: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      }
    },
    IdNivAct: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      }
    },
    obs_men: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    tableName: 'menage'
  });
};
