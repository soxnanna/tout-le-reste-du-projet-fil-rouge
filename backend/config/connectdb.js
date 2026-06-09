/* ==============================================
   config/connectdb.js — Connexion MongoDB Local
   ============================================== */

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connecté : ${conn.connection.host}`);
    console.log(`📦 Base de données  : ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Erreur connexion MongoDB : ${error.message}`);
    console.error('💡 Vérifiez que MongoDB est bien démarré sur votre machine.');
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => console.warn('⚠️  MongoDB déconnecté'));
mongoose.connection.on('reconnected',  () => console.log('🔄 MongoDB reconnecté'));

module.exports = connectDB;
