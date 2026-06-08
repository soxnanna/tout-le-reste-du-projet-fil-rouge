/* ==============================================
   middleware/authMiddleware.js — Protection des routes
   ============================================== */

const jwt  = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Récupérer le token depuis le header
      token = req.headers.authorization.split(' ')[1];

      // Décoder le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ajouter l'utilisateur à la requête (sans le mot de passe)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, message: 'Non autorisé, token invalide.' });
    }
  }

  if (!token) {
    res.status(401).json({ success: false, message: 'Non autorisé, aucun token fourni.' });
  }
};

module.exports = { protect };
