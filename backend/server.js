const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db"); // Koneksi database (pastikan file db.js ada)
const authRoutes = require("./routes/authRoutes");
const guruRoutes = require("./routes/guruRoutes");
const siswaRoutes = require("./routes/siswaRoutes");
const absensiGuruRoutes = require("./routes/absensiGuruRoutes");
const absensiSiswaRoutes = require("./routes/absensiSiswaRoutes");
const modesRoutes = require("./routes/modesRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parsing JSON request body

// Routes Auth
app.use("/api/auth", authRoutes);

// Routes Guru
app.use("/api/guru", guruRoutes);

// Routes Siswa
app.use("/api/siswa", siswaRoutes);

// Routes Absensi Guru & Siswa
app.use("/api/absensi", absensiGuruRoutes, absensiSiswaRoutes);

// Routes Modes
app.use("/api/modes", modesRoutes);

// Routes Dashboard
app.use("/api/dashboard", dashboardRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

// Menjalankan server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
