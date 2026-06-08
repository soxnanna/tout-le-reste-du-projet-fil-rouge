/* ==============================================
   app.js — Point d'entrée de l'API Portfolio
   Express.js + MongoDB Atlas
   ============================================== */

require('dotenv').config();

const express      = require('express');
const cors         = require('cors');
const connectDB    = require('./config/connectdb');
const projetRoutes = require('./routes/projetRoutes');
const authRoutes   = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');
const certificationRoutes = require('./routes/certificationRoutes');

/* ── Connexion MongoDB Atlas ── */
connectDB();

const app = express();

/* ── Middlewares ── */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

/* ── Route santé ── */
app.get('/', (req, res) => {
  res.json({
    message : '🚀 API Portfolio opérationnelle',
    version : '1.0.0',
    routes  : {
      'GET    /projets'     : 'Tous les projets',
      'POST   /projets'     : 'Ajouter un projet (Protégé)',
      'GET    /projets/:id' : 'Un projet par ID',
      'PUT    /projets/:id' : 'Modifier un projet (Protégé)',
      'DELETE /projets/:id' : 'Supprimer un projet (Protégé)',
      'POST   /auth/login'  : 'Se connecter',
    },
  });
});

/* ── Routes ── */
app.use('/auth',    authRoutes);
app.use('/messages', messageRoutes);
app.use('/projets', projetRoutes);
app.use('/certifications', certificationRoutes);

/* ── 404 ── */
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route introuvable : ${req.method} ${req.originalUrl}` });
});

/* ── Erreurs globales ── */
app.use((err, req, res, next) => {
  console.error('💥', err.stack);
  res.status(500).json({ success: false, message: err.message || 'Erreur serveur.' });
});

/* ── Démarrage ── */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('');
  console.log('╔══════════════════════════════════════════╗');
  console.log('║   🚀  API PORTFOLIO DÉMARRÉE             ║');
  console.log('╠══════════════════════════════════════════╣');
  console.log(`║   ➜  http://localhost:${PORT}                ║`);
  console.log('╚══════════════════════════════════════════╝');
  console.log('');
});

module.exports = app;
