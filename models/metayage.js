/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('metayage', {
    IdMet: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    pu: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    qte: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    dureeMet: {
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
        model: 'foncier',
        key: 'IdFonc'
      }
    },
    IdTypeCult: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'param_divers',
        key: 'IdParam'
      }
    }
  }, {
    tableName: 'metayage'
  });
};
