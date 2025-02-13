"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("absensi_guru", {
      id_absensi_guru: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      id_guru: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "guru",
          key: "id_guru",
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
        type: Sequelize.ENUM("Tepat Waktu", "Lembur"),
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

    // Menambahkan indeks pada id_guru
    await queryInterface.addIndex("absensi_guru", ["id_guru"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("absensi_guru");
  },
};
