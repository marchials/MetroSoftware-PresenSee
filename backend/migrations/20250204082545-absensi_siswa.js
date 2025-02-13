"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("absensi_siswa", {
      id_absensi_siswa: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_siswa: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "siswa",
          key: "id_siswa",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      waktu_masuk: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      keterangan_masuk: {
        type: Sequelize.ENUM("Tepat Waktu", "Terlambat"),
        allowNull: true,
      },
      waktu_pulang: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      keterangan_pulang: {
        type: Sequelize.ENUM("Tepat Waktu", "Telat Absen Pulang"),
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Menambahkan indeks pada id_siswa
    await queryInterface.addIndex("absensi_siswa", ["id_siswa"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("absensi_siswa");
  },
};
