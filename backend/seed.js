/* ==============================================
   seed.js — Peuplement de la base de données
   ============================================== */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const Projet = require('./models/projetModel');
const Certification = require('./models/certificationModel');
const User   = require('./models/userModel');

const projetsDemo = [
  // --- PROJETS ODC --- (7 Projets "En cours")
  {
    libelle     : 'Projet Fil Rouge : Architecture Portfolio Fullstack (MERN)',
    image       : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=400&auto=format&fit=crop',
    description : 'Conception intégrale d\'une plateforme web dynamique pour la gestion de carrière. Côté Frontend, utilisation de React JS avec une gestion d\'état via les Hooks et un routage fluide pour une expérience SPA optimale. Côté Backend, développement d\'une API REST sous Node.js et Express sécurisée par JWT et CORS. La persistance des données est assurée par MongoDB, avec une modélisation rigoureuse via Mongoose. Le design responsive, réalisé avec Tailwind CSS, garantit une accessibilité parfaite sur tous supports.',
    technologie : 'React JS, Node.js, MongoDB, Express, Tailwind CSS, JWT',
    dateDebut   : '2024-02-01',
    dateFin     : '',
    categorie   : 'ODC',
    statut      : 'En cours'
  },
  {
    libelle     : 'Infrastructure as Code (IaC) : Automatisation AWS',
    image       : 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=400&auto=format&fit=crop',
    description : 'Révolutionner le déploiement d\'infrastructure par l\'automatisation. Utilisation de Terraform pour définir et provisionner l\'ensemble des ressources Cloud sur AWS de manière reproductible. Création d\'un VPC sécurisé, de sous-réseaux isolés, de passerelles Internet et d\'instances EC2 configurées pour la haute disponibilité.',
    technologie : 'Terraform, AWS (VPC, EC2, IAM), Cloud Automation',
    dateDebut   : '2024-04-01',
    dateFin     : '',
    categorie   : 'ODC',
    statut      : 'En cours'
  },
  {
    libelle     : 'Orchestration de Conteneurs : Docker & Kubernetes (EKS)',
    image       : 'https://images.unsplash.com/photo-1605745341112-85968b193ef5?q=80&w=400&auto=format&fit=crop',
    description : 'Modernisation applicative via la conteneurisation. Création d\'images Docker optimisées pour les différents services du portfolio, utilisant des builds multi-étapes pour réduire la surface d\'attaque et la taille des images. Orchestration du déploiement sur Amazon EKS (Kubernetes).',
    technologie : 'Docker, Kubernetes (K8s), Amazon EKS, Cloud Native',
    dateDebut   : '2024-04-16',
    dateFin     : '',
    categorie   : 'ODC',
    statut      : 'En cours'
  },
  {
    libelle     : 'Chaîne CI/CD Intégrée : Jenkins & SonarQube',
    image       : 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop',
    description : 'Sécurisation et accélération du cycle de livraison logiciel. Mise en place d\'un serveur Jenkins automatisant l\'intégralité du workflow : du push de code sur GitHub au déploiement en production. Intégration de SonarQube pour l\'analyse continue de la qualité du code.',
    technologie : 'Jenkins Pipelines, SonarQube, GitHub Webhooks, DevSecOps',
    dateDebut   : '2024-04-01',
    dateFin     : '',
    categorie   : 'ODC',
    statut      : 'En cours'
  },
  {
    libelle     : 'Observabilité Avancée : Prometheus & Grafana',
    image       : 'https://images.unsplash.com/photo-1551288049-bbbda5366fd9?q=80&w=400&auto=format&fit=crop',
    description : 'Maîtrise de la santé des systèmes en temps réel. Déploiement d\'une pile de monitoring complète pour surveiller l\'infrastructure Cloud et les performances applicatives. Configuration de Prometheus pour l\'ingestion des métriques et création de dashboards Grafana.',
    technologie : 'Prometheus, Grafana, Alerting, Monitoring',
    dateDebut   : '2024-05-01',
    dateFin     : '',
    categorie   : 'ODC',
    statut      : 'En cours'
  },
  {
    libelle     : 'Ingénierie DevOps Assistée par IA',
    image       : 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=400&auto=format&fit=crop',
    description : 'Optimisation des cycles de vie applicatifs via l\'Intelligence Artificielle. Utilisation du Prompt Engineering pour la génération de scripts Terraform et de pipelines Jenkins. Mise en place de stratégies AIOps pour l\'analyse prédictive.',
    technologie : 'Generative AI, Prompt Engineering, AIOps, GitHub Copilot',
    dateDebut   : '2024-05-15',
    dateFin     : '',
    categorie   : 'ODC',
    statut      : 'En cours'
  },
  {
    libelle     : 'Audit de Sécurité Automatisé avec Trivy',
    image       : 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=400&auto=format&fit=crop',
    description : 'Renforcement de la posture de sécurité Cloud. Utilisation de Trivy pour réaliser des scans de vulnérabilités profonds sur les images de conteneurs et les configurations IaC (Terraform). Identification proactive des failles de sécurité.',
    technologie : 'Trivy, Security Auditing, Docker Security, IaC Scan',
    dateDebut   : '2024-05-16',
    dateFin     : '',
    categorie   : 'ODC',
    statut      : 'En cours'
  },
  // --- PROJETS ISI --- (2 Projets "Terminé")
  {
    libelle     : 'OpenLDAP : Gouvernance des Identités & Accès',
    image       : 'https://images.unsplash.com/photo-1558494949-ef010cbdcc48?q=80&w=400&auto=format&fit=crop',
    description : 'Centralisation et sécurisation de l\'annuaire d\'entreprise. Mise en œuvre d\'un serveur OpenLDAP sous Linux pour la gestion unifiée des utilisateurs et des ressources. Configuration des schémas personnalisés, structuration en Unités Organisationnelles (OU) et mise en place d\'ACL strictes.',
    technologie : 'OpenLDAP, Linux Administration, Directory Services',
    dateDebut   : '2023-11-01',
    dateFin     : '2023-11-30',
    categorie   : 'ISI',
    statut      : 'Terminé'
  },
  {
    libelle     : 'Microsoft Exchange : Communication Unifiée',
    image       : 'https://images.unsplash.com/photo-1557200134-90327ee9fafa?q=80&w=400&auto=format&fit=crop',
    description : 'Déploiement d\'une solution de messagerie collaborative de classe mondiale. Installation et configuration fine de Microsoft Exchange Server en environnement Active Directory. Gestion des boîtes aux lettres, des groupes de distribution.',
    technologie : 'Exchange Server, Windows Server, Active Directory, SSL',
    dateDebut   : '2023-12-01',
    dateFin     : '2023-12-20',
    categorie   : 'ISI',
    statut      : 'Terminé'
  }
];

const certificationsDemo = [
  {
    libelle      : 'AWS Certified Cloud Practitioner',
    organisation : 'Amazon Web Services',
    statut       : 'Terminé',
    image        : '☁️',
    dateObtention: '2024-01-15',
    lien         : 'https://aws.amazon.com/'
  },
  {
    libelle      : 'CCNA 1 : Networking Basics',
    organisation : 'Cisco Networking Academy',
    statut       : 'Terminé',
    image        : '🛰️',
    dateObtention: '2023-06-10',
    lien         : 'https://www.netacad.com/'
  },
  {
    libelle      : 'CCNA 2 : Switching & Routing',
    organisation : 'Cisco Networking Academy',
    statut       : 'En cours',
    image        : '🛣️',
    dateObtention: '',
    lien         : ''
  },
  {
    libelle      : 'Linux Essentials',
    organisation : 'NDG / LPI',
    statut       : 'Terminé',
    image        : '🐧',
    dateObtention: '2023-09-05',
    lien         : 'https://www.lpi.org/'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🚀 Connexion à MongoDB pour le seeding...');

    // Nettoyer la base existante
    const deletedProjects = await Projet.deleteMany({});
    console.log(`🧹 Base de données nettoyée (${deletedProjects.deletedCount} projets supprimés).`);
    
    const deletedCerts = await Certification.deleteMany({});
    console.log(`🧹 Base de données nettoyée (${deletedCerts.deletedCount} certifications supprimées).`);

    // Vider aussi les users pour être propre
    await User.deleteMany({});

    // Insérer les projets
    const insertedProjects = await Projet.insertMany(projetsDemo);
    console.log(`✅ ${insertedProjects.length} nouveaux projets ajoutés !`);
    
    // Insérer les certifications
    const insertedCerts = await Certification.insertMany(certificationsDemo);
    console.log(`✅ ${insertedCerts.length} nouvelles certifications ajoutées !`);

    // Vérification immédiate
    const countProjects = await Projet.countDocuments();
    const countCerts = await Certification.countDocuments();
    console.log(`📊 Nombre total de projets en base maintenant : ${countProjects}`);
    console.log(`📊 Nombre total de certifications en base maintenant : ${countCerts}`);

    // Créer un utilisateur Admin
    await User.create({
      email    : 'soxnanna@gmail.com',
      password : 'Passer@1'
    });
    console.log('👤 Utilisateur Admin créé : soxnanna@gmail.com / Passer@1');

    process.exit();
  } catch (error) {
    console.error('❌ Erreur lors du seeding :', error);
    process.exit(1);
  }
};

seedDB();
