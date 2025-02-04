'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const bcrypt = require('bcryptjs');

    const password = bcrypt.hashSync('superadmin123', 10); // Ganti dengan password yang diinginkan

    await queryInterface.bulkInsert('admin', [{
      username: 'superadmin', // Ganti dengan username yang diinginkan
      password: password,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('admin', null, {});
  }
};
