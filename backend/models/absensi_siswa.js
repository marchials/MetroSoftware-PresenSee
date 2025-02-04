const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('absensi_siswa', {
    id_absensi_siswa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    id_siswa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'siswa',
        key: 'id_siswa'
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
      type: DataTypes.ENUM('Tepat Waktu','Telat Absen Pulang'),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'absensi_siswa',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_absensi_siswa" },
        ]
      },
      {
        name: "id_siswa",
        using: "BTREE",
        fields: [
          { name: "id_siswa" },
        ]
      },
    ]
  });
};
