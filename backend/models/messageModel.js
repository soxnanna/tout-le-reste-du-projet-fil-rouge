/* ==============================================
   models/messageModel.js — Messages de contact
   ============================================== */

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom est obligatoire'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email est obligatoire'],
    trim: true,
    lowercase: true
  },
  objet: {
    type: String,
    required: [true, 'L\'objet est obligatoire'],
    trim: true
  },
  message: {
    type: String,
    required: [true, 'Le message est obligatoire'],
    trim: true
  },
  lu: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
