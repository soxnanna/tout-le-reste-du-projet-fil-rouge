/* ==============================================
   routes/certificationRoutes.js — Routes REST
   ============================================== */

const express = require('express');
const router  = express.Router();

const {
  ajouterCertification,
  getToutesLesCertifications,
  modifierCertification,
  supprimerCertification,
} = require('../controllers/certificationController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getToutesLesCertifications)
  .post(protect, ajouterCertification);

router.route('/:id')
  .put(protect, modifierCertification)
  .delete(protect, supprimerCertification);

module.exports = router;
