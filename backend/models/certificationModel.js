/* ==============================================
   models/certificationModel.js — Schéma Mongoose
   ============================================== */

const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema(
  {
    libelle: {
      type     : String,
      required : [true, 'Le libellé est obligatoire'],
      trim     : true,
      maxlength: [100, 'Maximum 100 caractères'],
    },
    organisation: {
      type     : String,
      required : [true, "L'organisation est obligatoire"],
      trim     : true,
      maxlength: [100, 'Maximum 100 caractères'],
    },
    statut: {
      type   : String,
      enum   : ['En cours', 'Terminé'],
      default: 'Terminé',
    },
    image: {
      type   : String,
      default: '',
      trim   : true,
    },
    dateObtention: {
      type   : String,
      default: '',
    },
    lien: {
      type   : String,
      default: '',
      trim   : true,
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

module.exports = mongoose.model('Certification', CertificationSchema);
