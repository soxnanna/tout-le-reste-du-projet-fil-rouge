/* ==============================================
   controllers/authController.js — Login & Auth
   ============================================== */

const User = require('../models/userModel');
const jwt  = require('jsonwebtoken');

// Générer un Token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Auth user & get token
// @route   POST /auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id   : user._id,
        email : user.email,
        token : generateToken(user._id),
      });
    } else {
      res.status(401).json({ success: false, message: 'Email ou mot de passe invalide.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

module.exports = { loginUser };
