const { absensi_siswa, siswa } = require("../models");
const moment = require("moment-timezone");
const { Op } = require("sequelize");

const addAbsensiSiswa = async (req, res) => {
  const { face_encoding } = req.body; // Menggunakan encoding wajah untuk identifikasi siswa
  const now = moment().tz("Asia/Jakarta");

  const dayOfWeek = now.day(); // 0 (Minggu) sampai 6 (Sabtu)
  let status = {}; // Status untuk LED dan buzzer

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    status = { buzzer: true, led: "red" };
    return res.status(400).json({ message: "Absensi hanya berlaku Senin-Jumat", status });
  }

  // Validasi jam masuk dan pulang
  const hour = now.hour();
  const minute = now.minute();
  const isValidMasuk = (hour === 6 && minute >= 0) || (hour === 7 && minute <= 30);
  const isValidKeluar = (hour === 15 && minute >= 0) || (hour === 16 && minute <= 0);
  const isTelatKeluar = (hour === 16 && minute > 0) || (hour >= 17 && hour < 18);

  try {
    // Cari siswa berdasarkan face_encoding
    const existingSiswa = await siswa.findOne({ where: { face_encoding } });

    if (!existingSiswa) {
      status = { buzzer: true, led: "red" };
      return res.status(404).json({ message: "Wajah tidak dikenali", status });
    }

    // Cek apakah siswa sudah absen hari ini
    const existingAbsensi = await absensi_siswa.findOne({
      where: {
        id_siswa: existingSiswa.id_siswa,
        waktu_masuk: {
          [Op.gte]: moment().tz("Asia/Jakarta").startOf("day").toDate(),
        },
      },
    });

    if (!existingAbsensi) {
      // Absensi masuk
      if (!isValidMasuk) {
        status = { buzzer: true, led: "blue" };
        return res.status(400).json({ message: "Waktu absen masuk tidak valid", status });
      }

      const keteranganMasuk = (hour < 7 || (hour === 7 && minute <= 30)) ? "Tepat Waktu" : "Terlambat";

      await absensi_siswa.create({
        id_siswa: existingSiswa.id_siswa,
        waktu_masuk: now.toDate(),
        keterangan_masuk: keteranganMasuk,
      });

      status = { buzzer: false, led: "green" };
      return res.status(200).json({ message: "Absen masuk berhasil", status });
    } else if (!existingAbsensi.waktu_pulang) {
      // Absensi pulang
      if (!isValidKeluar && !isTelatKeluar) {
        status = { buzzer: true, led: "blue" };
        return res.status(400).json({ message: "Waktu absen pulang tidak valid", status });
      }

      const keteranganPulang = isValidKeluar ? "Tepat Waktu" : "Telat Absen Pulang";

      await existingAbsensi.update({
        waktu_pulang: now.toDate(),
        keterangan_pulang: keteranganPulang,
      });

      status = { buzzer: false, led: "green" };
      return res.status(200).json({ message: "Absen pulang berhasil", status });
    } else {
      status = { buzzer: true, led: "blue" };
      return res.status(400).json({ message: "Sudah absen masuk dan pulang hari ini", status });
    }
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAbsensiSiswa = async (req, res) => {
  try {
    const absensi = await absensi_siswa.findAll({
      include: [{ model: siswa, as: "siswa", attributes: ["nama", "nisn", "kelas"] }],
    });

    const formattedAbsensi = absensi.map((data) => ({
      ...data.toJSON(),
      waktu_masuk: data.waktu_masuk ? moment(data.waktu_masuk).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss") : null,
      waktu_pulang: data.waktu_pulang ? moment(data.waktu_pulang).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss") : null,
    }));

    res.status(200).json(formattedAbsensi);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  addAbsensiSiswa,
  getAbsensiSiswa,
};
