const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('siswa', {
    id_siswa: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    nisn: {
      type: DataTypes.STRING(20),
      allowNull: true,
      unique: "nisn"
    },
    kelas: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    face_encoding: {
      type: DataTypes.JSON,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'siswa',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_siswa" },
        ]
      },
      {
        name: "nisn",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nisn" },
        ]
      },
    ]
  });
};
