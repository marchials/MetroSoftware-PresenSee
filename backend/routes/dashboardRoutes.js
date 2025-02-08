const express = require("express");
const { getDashboardStats } = require("../controllers/dashboardController");

const router = express.Router();

// Route untuk mendapatkan statistik dashboard
router.get("/stats", getDashboardStats);

module.exports = router;
