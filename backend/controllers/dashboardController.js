const { admin, guru, siswa, absensi_guru, absensi_siswa } = require("../models");
const { Op } = require("sequelize");

exports.getDashboardStats = async (req, res) => {
  try {
    console.log("Fetching dashboard stats...");

    // Total admin, guru, dan siswa
    const totalAdmin = await admin.count();
    const totalGuru = await guru.count();
    const totalSiswa = await siswa.count();

    console.log("Total Admin:", totalAdmin);
    console.log("Total Guru:", totalGuru);
    console.log("Total Siswa:", totalSiswa);

    // Ambil tanggal awal & akhir bulan ini
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Total guru yang absen bulan ini
    const totalGuruAbsen = await absensi_guru.count({
      where: {
        waktu_masuk: {
          [Op.between]: [firstDayOfMonth, lastDayOfMonth],
        },
      },
    });

    // Total siswa yang absen bulan ini
    const totalSiswaAbsen = await absensi_siswa.count({
      where: {
        waktu_masuk: {
          [Op.between]: [firstDayOfMonth, lastDayOfMonth],
        },
      },
    });

    console.log("Total Guru Absen Bulan Ini:", totalGuruAbsen);
    console.log("Total Siswa Absen Bulan Ini:", totalSiswaAbsen);

    res.json({
      totalAdmin,
      totalGuru,
      totalSiswa,
      totalGuruAbsen,
      totalSiswaAbsen,
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    res.status(500).json({ message: "Gagal mengambil data dashboard", error });
  }
};
