"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("siswa", {
      id_siswa: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nama: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      nisn: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true,
      },
      kelas: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      face_encoding: {
        type: Sequelize.JSON,
        allowNull: false,
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

    // Menambahkan indeks unik untuk nisn
    await queryInterface.addIndex("siswa", ["nisn"], {
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("siswa");
  },
};
