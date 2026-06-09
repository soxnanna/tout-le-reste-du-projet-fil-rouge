/* ==============================================
   controllers/messageController.js
   ============================================== */

const Message    = require('../models/messageModel');
const nodemailer = require('nodemailer');

// Configuration du transporteur d'email (SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Vérifier la connexion SMTP au démarrage
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ Erreur configuration Email:', error);
  } else {
    console.log('📧 Serveur prêt à envoyer des emails !');
  }
});

// @desc    Envoyer un message
// @route   POST /messages
const envoyerMessage = async (req, res) => {
  try {
    const { nom, email, objet, message } = req.body;
    
    const nouveauMessage = await Message.create({
      nom, email, objet, message
    });

    // Envoi de l'email de notification à l'admin
    const mailOptions = {
      from    : process.env.EMAIL_USER,
      to      : 'soxnanna@gmail.com',
      subject : `[Portfolio] Nouveau message : ${objet}`,
      text    : `Vous avez reçu un nouveau message de ${nom} (${email}) :\n\n${message}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('📧 Email envoyé avec succès !');
    } catch (mailError) {
      console.error('❌ Erreur technique lors de l\'envoi de l\'email:', mailError);
      // On ne bloque pas la réponse client car le message est déjà en base
    }

    res.status(201).json({ success: true, data: nouveauMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi du message.' });
  }
};

// @desc    Voir tous les messages (Admin)
// @route   GET /messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur serveur.' });
  }
};

module.exports = { envoyerMessage, getMessages };
