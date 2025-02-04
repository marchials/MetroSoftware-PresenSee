const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('absensi_guru', {
    id_absensi_guru: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_guru: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'guru',
        key: 'id_guru'
      }
    },
    waktu_masuk: {
      type: DataTypes.DATE,
      allowNull: true
    },
    keterangan_masuk: {
      type: DataTypes.ENUM('Tepat Waktu','Terlambat'),
      allowNull: true
    },
    waktu_pulang: {
      type: DataTypes.DATE,
      allowNull: true
    },
    keterangan_pulang: {
      type: DataTypes.ENUM('Tepat Waktu','Lembur'),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'absensi_guru',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_absensi_guru" },
        ]
      },
      {
        name: "id_guru",
        using: "BTREE",
        fields: [
          { name: "id_guru" },
        ]
      },
    ]
  });
};
