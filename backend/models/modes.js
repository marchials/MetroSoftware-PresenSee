const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('modes', {
    id_mode: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    modes: {
      type: DataTypes.ENUM('ADD','SCAN'),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'modes',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_mode" },
        ]
      },
    ]
  });
};
