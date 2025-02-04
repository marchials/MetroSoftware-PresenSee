'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load semua model dalam folder models
fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Pastikan Model telah dimuat
console.log('Loaded Models:', Object.keys(db)); // Debugging

// Definisikan relasi setelah semua model dimuat
const { siswa, absensi_siswa, guru, absensi_guru } = db;

// Relasi Siswa & Absensi Siswa
if (siswa && absensi_siswa) {
  siswa.hasMany(absensi_siswa, { foreignKey: 'id_siswa', as: 'absensi' });
  absensi_siswa.belongsTo(siswa, { foreignKey: 'id_siswa', as: 'siswa' });
} else {
  console.error('Model Siswa atau AbsensiSiswa tidak ditemukan!');
}

// Relasi Guru & Absensi Guru (Jika Ada)
if (guru && absensi_guru) {
  guru.hasMany(absensi_guru, { foreignKey: 'id_guru', as: 'absensi' });
  absensi_guru.belongsTo(guru, { foreignKey: 'id_guru', as: 'guru' });
} else {
  console.error('Model Guru atau AbsensiGuru tidak ditemukan!');
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
