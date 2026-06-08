/* ==============================================
   controllers/projetController.js — Logique métier
   ==============================================
   POST   /projets        → ajouterProjet
   GET    /projets        → getTousLesProjets
   GET    /projets/:id    → getUnProjet
   PUT    /projets/:id    → modifierProjet
   DELETE /projets/:id    → supprimerProjet
   ============================================== */

const Projet = require('../models/projetModel');

/* ── Ajouter un projet ── */
const ajouterProjet = async (req, res) => {
  try {
    const { libelle, image, description, technologie, dateDebut, dateFin } = req.body;

    if (!libelle || !description) {
      return res.status(400).json({
        success: false,
        message: 'Les champs "libelle" et "description" sont obligatoires.',
      });
    }

    const projet = await Projet.create({
      libelle,
      image       : image        || `https://via.placeholder.com/300x200?text=${encodeURIComponent(libelle)}`,
      description,
      technologie : technologie  || 'Non précisé',
      dateDebut   : dateDebut    || '',
      dateFin     : dateFin      || '',
    });

    return res.status(201).json(projet);
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(' | ') });
    }
    console.error('[ajouterProjet]', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur interne.' });
  }
};

/* ── Retourner tous les projets ── */
const getTousLesProjets = async (req, res) => {
  try {
    const { search } = req.query;
    const filtre = search && search.trim()
      ? { $or: [
          { libelle     : { $regex: search.trim(), $options: 'i' } },
          { technologie : { $regex: search.trim(), $options: 'i' } },
        ]}
      : {};

    const projets = await Projet.find(filtre).sort({ createdAt: -1 });
    
    // S'assurer que chaque projet a bien _id pour le frontend
    const projetsFormates = projets.map(p => {
      const obj = p.toObject();
      obj._id = obj._id || p.id;
      return obj;
    });

    return res.status(200).json(projetsFormates);
  } catch (error) {
    console.error('[getTousLesProjets]', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur interne.' });
  }
};

/* ── Retourner toutes les infos d'un projet donné ── */
const getUnProjet = async (req, res) => {
  try {
    const projet = await Projet.findById(req.params.id);
    if (!projet) {
      return res.status(404).json({
        success: false,
        message: `Aucun projet trouvé avec l'id : ${req.params.id}`,
      });
    }
    const projetFormate = projet.toObject();
    projetFormate._id = projetFormate._id || projet.id;
    return res.status(200).json(projetFormate);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Identifiant invalide.' });
    }
    console.error('[getUnProjet]', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur interne.' });
  }
};

/* ── Modifier les informations d'un projet donné ── */
const modifierProjet = async (req, res) => {
  try {
    const { libelle, image, description, technologie, dateDebut, dateFin } = req.body;

    const champs = {};
    if (libelle      !== undefined) champs.libelle      = libelle;
    if (image        !== undefined) champs.image        = image;
    if (description  !== undefined) champs.description  = description;
    if (technologie  !== undefined) champs.technologie  = technologie;
    if (dateDebut    !== undefined) champs.dateDebut    = dateDebut;
    if (dateFin      !== undefined) champs.dateFin      = dateFin;

    if (Object.keys(champs).length === 0) {
      return res.status(400).json({ success: false, message: 'Aucun champ à mettre à jour.' });
    }

    const projetModifie = await Projet.findByIdAndUpdate(
      req.params.id, champs, { new: true, runValidators: true }
    );

    if (!projetModifie) {
      return res.status(404).json({
        success: false,
        message: `Aucun projet trouvé avec l'id : ${req.params.id}`,
      });
    }

    return res.status(200).json(projetModifie);
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Identifiant invalide.' });
    }
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(e => e.message);
      return res.status(400).json({ success: false, message: messages.join(' | ') });
    }
    console.error('[modifierProjet]', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur interne.' });
  }
};

/* ── Supprimer un projet ── */
const supprimerProjet = async (req, res) => {
  try {
    const projet = await Projet.findByIdAndDelete(req.params.id);
    if (!projet) {
      return res.status(404).json({
        success: false,
        message: `Aucun projet trouvé avec l'id : ${req.params.id}`,
      });
    }
    return res.status(200).json({ success: true, message: 'Projet supprimé avec succès.' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ success: false, message: 'Identifiant invalide.' });
    }
    console.error('[supprimerProjet]', error);
    return res.status(500).json({ success: false, message: 'Erreur serveur interne.' });
  }
};

module.exports = {
  ajouterProjet,
  getTousLesProjets,
  getUnProjet,
  modifierProjet,
  supprimerProjet,
};
