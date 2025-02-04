const { absensi_guru, guru } = require("../models");
const moment = require("moment-timezone");

const addAbsensi = async (req, res) => {
  const { rfid_tag } = req.body;
  const now = moment().tz("Asia/Jakarta"); // Gunakan WIB untuk semua operasi waktu

  const tanggal = now.format("YYYY-MM-DD");
  const waktu = now.format("HH:mm:ss");

  const dayOfWeek = now.day(); // 0 (Minggu) sampai 6 (Sabtu)
  let status = {}; // Status untuk LED dan buzzer

  if (dayOfWeek === 0 || dayOfWeek === 6) {
    status = { buzzer: true, led: "red" };
    return res.status(400).json({ message: "Absensi hanya Senin-Jumat", status });
  }

  // Validasi jam masuk dan pulang
  const hour = now.hour();
  const minute = now.minute();
  const isValidMasuk = (hour === 6 && minute >= 0) || (hour === 7 && minute <= 30);
  const isValidKeluar = (hour === 15 && minute >= 0) || (hour === 16 && minute <= 0);

  try {
    // Cek apakah RFID ada di database guru
    const existingGuru = await guru.findOne({ where: { rfid_tag } });

    if (!existingGuru) {
      status = { buzzer: true, led: "red" };
      return res.status(404).json({ message: "RFID tidak ditemukan", status });
    }

    // Cek apakah guru sudah absen hari ini dengan WIB
    const existingAbsensi = await absensi_guru.findOne({
      where: {
        id_guru: existingGuru.id_guru,
        waktu_masuk: {
          [require("sequelize").Op.gte]: moment().tz("Asia/Jakarta").startOf("day").toDate(), // Pastikan menggunakan WIB
        },
      },
    });

    if (!existingAbsensi) {
      if (!isValidMasuk) {
        status = { buzzer: true, led: "blue" };
        return res.status(400).json({ message: "Waktu absen masuk tidak valid", status });
      }

      // Tentukan status kehadiran
      const keteranganMasuk = now.hour() < 7 || (now.hour() === 7 && now.minute() <= 30) ? "Tepat Waktu" : "Terlambat";

      await absensi_guru.create({
        id_guru: existingGuru.id_guru,
        waktu_masuk: now.toDate(), // WIB
        keterangan_masuk: keteranganMasuk,
      });

      status = { buzzer: false, led: "green" };
      return res.status(200).json({ message: "Absen masuk berhasil", status });
    } else if (!existingAbsensi.waktu_pulang) {
      if (!isValidKeluar) {
        status = { buzzer: true, led: "blue" };
        return res.status(400).json({ message: "Waktu absen pulang tidak valid", status });
      }

      const keteranganPulang = now.hour() < 16 ? "Tepat Waktu" : "Lembur";

      await existingAbsensi.update({
        waktu_pulang: now.toDate(), // WIB
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

const getAbsensiGuru = async (req, res) => {
  try {
    const absensi = await absensi_guru.findAll({
      include: [{ model: guru, as: "guru", attributes: ["nama", "nip", "jabatan"] }],
    });

    // Pastikan semua waktu yang dikembalikan dalam WIB
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
  addAbsensi,
  getAbsensiGuru,
};
