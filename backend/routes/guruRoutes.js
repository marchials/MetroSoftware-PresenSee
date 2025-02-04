const express = require('express');
const {
  createGuru,
  updateGuru,
  deleteGuru,
  listGuru,
} = require('../controllers/guruController');
const verifyToken = require('../middleware/authMiddleware'); // Jika hanya admin bisa akses

const router = express.Router();

// CRUD Guru
router.post('/', verifyToken, createGuru);  // Tambah guru (admin only)
router.put('/:id_guru', verifyToken, updateGuru); // Update guru (admin only)
router.delete('/:id_guru', verifyToken, deleteGuru); // Hapus guru (admin only)
router.get('/', verifyToken, listGuru); // Ambil semua data guru (admin only)

module.exports = router;
