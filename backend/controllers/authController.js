const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { admin } = require('../models'); // Sesuaikan dengan nama model Anda
const dotenv = require('dotenv');
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Membuat admin baru
const createAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingAdmin = await admin.findOne({ where: { username } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newAdmin = await admin.create({ username, password: hashedPassword });

    return res.status(201).json({
      message: 'Admin created successfully',
      admin: { id_admin: newAdmin.id_admin, username: newAdmin.username },
    });
  } catch (error) {
    console.error('Error creating admin:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login admin
const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const foundAdmin = await admin.findOne({ where: { username } });

    if (!foundAdmin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    const isPasswordValid = bcrypt.compareSync(password, foundAdmin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id_admin: foundAdmin.id_admin, username: foundAdmin.username }, JWT_SECRET,);

    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Error logging in admin:', error.message);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Logout admin
const logoutAdmin = async (req, res) => {
  return res.status(200).json({ message: 'Logout successful' });
};

module.exports = {
  createAdmin,
  loginAdmin,
  logoutAdmin,
};
