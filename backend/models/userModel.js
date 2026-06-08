/* ==============================================
   models/userModel.js — Schéma Utilisateur (Admin)
   ============================================== */

const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type     : String,
    required : [true, 'L\'email est obligatoire'],
    unique   : true,
    lowercase: true,
    trim     : true
  },
  password: {
    type     : String,
    required : [true, 'Le mot de passe est obligatoire'],
    minlength: 6
  }
}, { timestamps: true });

// Hashage du mot de passe avant sauvegarde
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer les mots de passe
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
