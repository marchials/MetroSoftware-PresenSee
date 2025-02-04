const { siswa } = require('../models');

// ✅ 1. Tambah Siswa
const createSiswa = async (req, res) => {
  const { nama, nisn, kelas, face_encoding } = req.body;

  if (!nama || !nisn || !kelas || !face_encoding) {
    return res.status(400).json({ message: 'Semua field harus diisi' });
  }

  try {
    const existingSiswa = await siswa.findOne({ where: { nisn } });

    if (existingSiswa) {
      return res.status(400).json({ message: 'Siswa dengan NISN ini sudah ada' });
    }

    const newSiswa = await siswa.create({ nama, nisn, kelas, face_encoding });

    return res.status(201).json({
      message: 'Siswa berhasil ditambahkan',
      siswa: newSiswa,
    });
  } catch (error) {
    console.error('Error creating siswa:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ 2. Update Siswa
const updateSiswa = async (req, res) => {
  const { id_siswa } = req.params;
  const { nama, nisn, kelas, face_encoding } = req.body;

  try {
    const siswaToUpdate = await siswa.findByPk(id_siswa);

    if (!siswaToUpdate) {
      return res.status(404).json({ message: 'Siswa tidak ditemukan' });
    }

    siswaToUpdate.nama = nama || siswaToUpdate.nama;
    siswaToUpdate.nisn = nisn || siswaToUpdate.nisn;
    siswaToUpdate.kelas = kelas || siswaToUpdate.kelas;
    siswaToUpdate.face_encoding = face_encoding || siswaToUpdate.face_encoding;

    await siswaToUpdate.save();

    return res.status(200).json({
      message: 'Siswa berhasil diperbarui',
      siswa: siswaToUpdate,
    });
  } catch (error) {
    console.error('Error updating siswa:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ 3. Hapus Siswa
const deleteSiswa = async (req, res) => {
  const { id_siswa } = req.params;

  try {
    const siswaToDelete = await siswa.findByPk(id_siswa);

    if (!siswaToDelete) {
      return res.status(404).json({ message: 'Siswa tidak ditemukan' });
    }

    await siswaToDelete.destroy();

    return res.status(200).json({ message: 'Siswa berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting siswa:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ 4. Get List Siswa
const listSiswa = async (req, res) => {
  try {
    const siswaList = await siswa.findAll();
    return res.status(200).json({ siswa: siswaList });
  } catch (error) {
    console.error('Error fetching siswa:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// ✅ 5. Get Siswa by ID
const getSiswaById = async (req, res) => {
  const { id_siswa } = req.params;

  try {
    const siswaDetail = await siswa.findByPk(id_siswa);

    if (!siswaDetail) {
      return res.status(404).json({ message: 'Siswa tidak ditemukan' });
    }

    return res.status(200).json({ siswa: siswaDetail });
  } catch (error) {
    console.error('Error fetching siswa:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createSiswa,
  updateSiswa,
  deleteSiswa,
  listSiswa,
  getSiswaById,
};
