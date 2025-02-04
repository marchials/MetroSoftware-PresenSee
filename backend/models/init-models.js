var DataTypes = require("sequelize").DataTypes;
var _absensi_guru = require("./absensi_guru");
var _absensi_siswa = require("./absensi_siswa");
var _admin = require("./admin");
var _guru = require("./guru");
var _modes = require("./modes");
var _sequelizemeta = require("./sequelizemeta");
var _siswa = require("./siswa");

function initModels(sequelize) {
  var absensi_guru = _absensi_guru(sequelize, DataTypes);
  var absensi_siswa = _absensi_siswa(sequelize, DataTypes);
  var admin = _admin(sequelize, DataTypes);
  var guru = _guru(sequelize, DataTypes);
  var modes = _modes(sequelize, DataTypes);
  var sequelizemeta = _sequelizemeta(sequelize, DataTypes);
  var siswa = _siswa(sequelize, DataTypes);

  absensi_guru.belongsTo(guru, { as: "id_guru_guru", foreignKey: "id_guru"});
  guru.hasMany(absensi_guru, { as: "absensi_gurus", foreignKey: "id_guru"});
  absensi_siswa.belongsTo(siswa, { as: "id_siswa_siswa", foreignKey: "id_siswa"});
  siswa.hasMany(absensi_siswa, { as: "absensi_siswas", foreignKey: "id_siswa"});

  return {
    absensi_guru,
    absensi_siswa,
    admin,
    guru,
    modes,
    sequelizemeta,
    siswa,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
