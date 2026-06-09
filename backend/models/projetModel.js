/* ==============================================
   models/projetModel.js — Schéma Mongoose
   ============================================== */

const mongoose = require('mongoose');

const ProjetSchema = new mongoose.Schema(
  {
    libelle: {
      type     : String,
      required : [true, 'Le libellé est obligatoire'],
      trim     : true,
      maxlength: [100, 'Maximum 100 caractères'],
    },
    image: {
      type   : String,
      default: '',
      trim   : true,
    },
    description: {
      type     : String,
      required : [true, 'La description est obligatoire'],
      trim     : true,
      maxlength: [2000, 'Maximum 2000 caractères'],
    },
    technologie: {
      type   : String,
      default: 'Non précisé',
      trim   : true,
    },
    dateDebut: {
      type   : String,
      default: '',
    },
    dateFin: {
      type   : String,
      default: '',
    },
    categorie: {
      type   : String,
      enum   : ['ODC', 'ISI', 'AUTRE'],
      default: 'ODC',
    },
    statut: {
      type   : String,
      enum   : ['En cours', 'Terminé'],
      default: 'En cours',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('Projet', ProjetSchema);
