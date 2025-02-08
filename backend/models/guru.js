const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('guru', {
    id_guru: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nama: {
      type: DataTypes.STRING(255),
      allowNull: true // Mengubah allowNull menjadi true
    },
    nip: {
      type: DataTypes.STRING(20),
      allowNull: true, // Mengubah allowNull menjadi true
      unique: "nip"
    },
    jabatan: {
      type: DataTypes.STRING(255),
      allowNull: true // Mengubah allowNull menjadi true
    },
    rfid_tag: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "rfid_tag"
    }
  }, {
    sequelize,
    tableName: 'guru',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_guru" },
        ]
      },
      {
        name: "nip",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "nip" },
        ]
      },
      {
        name: "rfid_tag",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "rfid_tag" },
        ]
      },
    ]
  });
};
