const { modes } = require('../models');

module.exports = {
  // Buat atau pastikan mode pertama selalu ada
  createOrEnsureMode: async (req, res) => {
    try {
      let firstMode = await modes.findOne();
      if (!firstMode) {
        firstMode = await modes.create({ modes: 'SCAN' });
      }
      res.status(200).json(firstMode);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update mode dengan auto-revert jika 'ADD'
  updateMode: async (req, res) => {
    try {
      let firstMode = await modes.findOne();
      if (!firstMode) {
        firstMode = await modes.create({ modes: 'SCAN' });
      }

      // Update mode baru
      await firstMode.update({ modes: req.body.modes });

      // Jika mode berubah ke ADD, auto-revert ke SCAN dalam 5 detik
      if (req.body.modes === 'ADD') {
        setTimeout(async () => {
          try {
            let currentMode = await modes.findOne();
            if (currentMode.modes === 'ADD') {
              await currentMode.update({ modes: 'SCAN' });
              console.log('[AUTO-REVERT] Mode kembali ke SCAN');
            }
          } catch (error) {
            console.error('Gagal auto-revert:', error);
          }
        }, 5000);
      }

      res.status(200).json(firstMode);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Ambil mode saat ini
  getMode: async (req, res) => {
    try {
      let firstMode = await modes.findOne();
      if (!firstMode) {
        firstMode = await modes.create({ modes: 'SCAN' });
      }
      res.status(200).json({ mode: firstMode.modes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
