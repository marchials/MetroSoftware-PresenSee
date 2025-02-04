const { Sequelize } = require('sequelize');

// Koneksi ke database
const sequelize = new Sequelize('official_presensee', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

module.exports = sequelize;
