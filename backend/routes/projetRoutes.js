/* ==============================================
   routes/projetRoutes.js — Routes REST
   ==============================================
   GET    /projets       → getTousLesProjets
   POST   /projets       → ajouterProjet
   GET    /projets/:id   → getUnProjet
   PUT    /projets/:id   → modifierProjet
   DELETE /projets/:id   → supprimerProjet
   ============================================== */

const express = require('express');
const router  = express.Router();

const {
  ajouterProjet,
  getTousLesProjets,
  getUnProjet,
  modifierProjet,
  supprimerProjet,
} = require('../controllers/projetController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getTousLesProjets)
  .post(protect, ajouterProjet);

router.route('/:id')
  .get(getUnProjet)
  .put(protect, modifierProjet)
  .delete(protect, supprimerProjet);

module.exports = router;
