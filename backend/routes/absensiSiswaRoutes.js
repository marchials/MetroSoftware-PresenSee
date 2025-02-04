const express = require("express");
const { addAbsensiSiswa, getAbsensiSiswa } = require("../controllers/absensiSiswaController");

const router = express.Router();

router.post("/siswa", addAbsensiSiswa);
router.get("/siswa", getAbsensiSiswa);

module.exports = router;
