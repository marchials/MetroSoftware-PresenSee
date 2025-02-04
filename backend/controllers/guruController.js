const { guru } = require('../models');
const dotenv = require('dotenv');
dotenv.config();

// Menambahkan guru baru
const createGuru = async (req, res) => {
  const { nama, nip, jabatan, rfid_tag } = req.body;

  if (!nama || !jabatan) {
    return res.status(400).json({ message: 'Nama dan jabatan wajib diisi' });
  }

  try {
    // Cek apakah guru dengan RFID atau NIP sudah ada
    const existingGuru = await guru.findOne({ where: { rfid_tag } });

    if (existingGuru) {
      return res.status(400).json({ message: 'Guru dengan RFID ini sudah ada' });
    }

    const newGuru = await guru.create({
      nama,
      nip,
      jabatan,
      rfid_tag,
    });

    return res.status(201).json({
      message: 'Guru berhasil ditambahkan',
      guru: newGuru,
    });
  } catch (error) {
    console.error('Error creating guru:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Mengupdate data guru
const updateGuru = async (req, res) => {
  const { id_guru } = req.params;
  const { nama, nip, jabatan, rfid_tag } = req.body;

  try {
    const guruToUpdate = await guru.findByPk(id_guru);

    if (!guruToUpdate) {
      return res.status(404).json({ message: 'Guru tidak ditemukan' });
    }

    // Update jika field tersedia dalam body request
    if (nama !== undefined) guruToUpdate.nama = nama;
    if (nip !== undefined) guruToUpdate.nip = nip;
    if (jabatan !== undefined) guruToUpdate.jabatan = jabatan;
    if (rfid_tag !== undefined) guruToUpdate.rfid_tag = rfid_tag;

    await guruToUpdate.save();

    return res.status(200).json({
      message: 'Guru berhasil diperbarui',
      guru: guruToUpdate,
    });
  } catch (error) {
    console.error('Error updating guru:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Menghapus guru
const deleteGuru = async (req, res) => {
  const { id_guru } = req.params;

  try {
    const guruToDelete = await guru.findByPk(id_guru);

    if (!guruToDelete) {
      return res.status(404).json({ message: 'Guru tidak ditemukan' });
    }

    await guruToDelete.destroy();

    return res.status(200).json({ message: 'Guru berhasil dihapus' });
  } catch (error) {
    console.error('Error deleting guru:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Menampilkan daftar guru
const listGuru = async (req, res) => {
  try {
    const gurus = await guru.findAll();
    return res.status(200).json({ guru: gurus });
  } catch (error) {
    console.error('Error fetching gurus:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  createGuru,
  updateGuru,
  deleteGuru,
  listGuru,
};
