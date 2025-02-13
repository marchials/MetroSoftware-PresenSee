module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('guru', 'nama', {
      type: Sequelize.STRING,
      allowNull: true,
    });
    await queryInterface.changeColumn('guru', 'jabatan', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('guru', 'nama', {
      type: Sequelize.STRING,
      allowNull: false, // Mengembalikannya ke non-null jika rollback
    });
    await queryInterface.changeColumn('guru', 'jabatan', {
      type: Sequelize.STRING,
      allowNull: false, // Mengembalikannya ke non-null jika rollback
    });
  },
};
