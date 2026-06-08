/* ==============================================
   controllers/certificationController.js — Logique métier
   ============================================== */

const Certification = require('../models/certificationModel');

/* ── Ajouter une certification ── */
const ajouterCertification = async (req, res) => {
  try {
    const { libelle, organisation, statut, image, dateObtention, lien } = req.body;

    if (!libelle || !organisation) {
      return res.status(400).json({
        success: false,
        message: 'Les champs "libelle" et "organisation" sont obligatoires.',
      });
    }

    const certification = await Certification.create({
      libelle,
      organisation,
      statut        : statut        || 'Terminé',
      image         : image         || '',
      dateObtention : dateObtention || '',
      lien          : lien          || '',
    });

    return res.status(201).json(certification);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(' | ') });
    }
    console.error('[ajouterCertification]', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur interne.' });
  }
};

/* ── Retourner toutes les certifications ── */
const getToutesLesCertifications = async (req, res) => {
  try {
    const certifications = await Certification.find({}).sort({ createdAt: -1 });
    
    const certsFormatees = certifications.map(c => {
      const obj = c.toObject();
      obj._id = obj._id || c.id;
      return obj;
    });

    return res.status(200).json(certsFormatees);
  } catch (error) {
    console.error('[getToutesLesCertifications]', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur interne.' });
  }
};

/* ── Modifier une certification ── */
const modifierCertification = async (req, res) => {
  try {
    const { libelle, organisation, statut, image, dateObtention, lien } = req.body;

    const champs = {};
    if (libelle       !== undefined) champs.libelle       = libelle;
    if (organisation  !== undefined) champs.organisation  = organisation;
    if (statut        !== undefined) champs.statut        = statut;
    if (image         !== undefined) champs.image         = image;
    if (dateObtention !== undefined) champs.dateObtention = dateObtention;
    if (lien          !== undefined) champs.lien          = lien;

    if (Object.keys(champs).length === 0) {
      return res.status(400).json({ success: false, message: 'Aucun champ à mettre à jour.' });
    }

    const certModifiee = await Certification.findByIdAndUpdate(
      req.params.id, champs, { new: true, runValidators: true }
    );

    if (!certModifiee) {
      return res.status(404).json({
        success: false,
        message: `Aucune certification trouvée avec l'id : ${req.params.id}`,
      });
    }

    return res.status(200).json(certModifiee);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Identifiant invalide.' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(' | ') });
    }
    console.error('[modifierCertification]', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur interne.' });
  }
};

/* ── Supprimer une certification ── */
const supprimerCertification = async (req, res) => {
  try {
    const cert = await Certification.findByIdAndDelete(req.params.id);
    if (!cert) {
      return res.status(404).json({
        success: false,
        message: `Aucune certification trouvée avec l'id : ${req.params.id}`,
      });
    }
    return res.status(200).json({ success: true, message: 'Certification supprimée avec succès.' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Identifiant invalide.' });
    }
    console.error('[supprimerCertification]', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur interne.' });
  }
};

module.exports = {
  ajouterCertification,
  getToutesLesCertifications,
  modifierCertification,
  supprimerCertification,
};
