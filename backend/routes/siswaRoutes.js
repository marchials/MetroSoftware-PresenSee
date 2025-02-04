const express = require('express');
const router = express.Router();
const siswaController = require('../controllers/siswaController');

// ✅ Route untuk mengelola data siswa
router.post('/', siswaController.createSiswa);         // Tambah siswa
router.put('/:id_siswa', siswaController.updateSiswa); // Update siswa
router.delete('/:id_siswa', siswaController.deleteSiswa); // Hapus siswa
router.get('/', siswaController.listSiswa);            // Get semua siswa
router.get('/:id_siswa', siswaController.getSiswaById); // Get detail siswa

module.exports = router;
