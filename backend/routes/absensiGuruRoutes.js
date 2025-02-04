const express = require("express");
const { addAbsensi, getAbsensiGuru } = require("../controllers/absensiGuruController");

const router = express.Router();

router.post("/guru", addAbsensi);
router.get("/guru", getAbsensiGuru);

module.exports = router;
