const express = require('express');
const router = express.Router();
const modesController = require('../controllers/modesController');

// Endpoint untuk mengambil mode saat ini
router.get('/', modesController.getMode);

// Endpoint untuk membuat mode jika belum ada (opsional)
router.post('/create', modesController.createOrEnsureMode);

// Endpoint untuk mengubah mode
router.put('/update', modesController.updateMode);

module.exports = router;
