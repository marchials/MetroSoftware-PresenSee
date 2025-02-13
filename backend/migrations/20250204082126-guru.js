"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("guru", {
      id_guru: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nama: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      nip: {
        type: Sequelize.STRING(20),
        allowNull: true,
        unique: true,
      },
      jabatan: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      rfid_tag: {
        type: Sequelize.STRING(50),
        allowNull: true,
        unique: true,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("guru");
  },
};
