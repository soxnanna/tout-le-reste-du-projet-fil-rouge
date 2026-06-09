import React from 'react';
import './CV.css';

function CV() {
  const imprimerCV = () => {
    setTimeout(() => {
      window.print();
    }, 500); // 500ms delay for stability
  };

  return (
    <div className="cv-container">
      <div className="cv-actions no-print">
        <button onClick={imprimerCV} className="btn btn-primary">IMPRIMER EN PDF 📄</button>
      </div>

      <div className="cv-paper" id="cv-to-print">
        <div className="cv-sidebar-left">
          <div className="cv-header-mini">
            <h1>Anna KEITA</h1>
            <p>Future Ingénieure Systèmes, Cloud & DevOps</p>
          </div>
          
          <section className="cv-side-section">
            <h4>CONTACT</h4>
            <p>📧 soxnanna@gmail.com</p>
            <p>📍 Dakar, Sénégal</p>
            <p>🔗 <a href="https://linkedin.com/in/anna-keita-1a83052aa/">LinkedIn</a></p>
            <p>💻 <a href="https://github.com/soxnanna">GitHub</a></p>
          </section>

          <section className="cv-side-section">
            <h4>OUTILS & TECH</h4>
            <ul className="cv-side-list">
              <li><strong>Cloud:</strong> AWS (IAM, VPC, EC2, S3, RDS, Lambda, Auto Scaling, ELB, Route53, CloudWatch, CloudTrail, DynamoDB)</li>
              <li><strong>Containers:</strong> Docker, K8s</li>
              <li><strong>IaC:</strong> Terraform</li>
              <li><strong>CI/CD:</strong> Jenkins, GH Actions</li>
              <li><strong>Monitoring:</strong> Prometheus</li>
              <li><strong>Versioning:</strong> Git</li>
              <li><strong>OS:</strong> Linux, Windows</li>
              <li><strong>Web:</strong> Nginx, React, Node.js</li>
            </ul>
          </section>

          <section className="cv-side-section">
            <h4>LANGUES</h4>
            <p>Français • Wolof</p>
          </section>

          <section className="cv-side-section">
            <h4>SOFT SKILLS</h4>
            <p style={{fontSize: '0.7rem'}}>Travail en équipe, Adaptabilité, Autonomie, Communication.</p>
          </section>
        </div>

        <div className="cv-main-right">
          <section className="cv-main-section">
            <h3>OBJECTIF</h3>
            <p className="cv-text-small">
              Étudiante en Administration Systèmes & Réseaux, passionnée par le Cloud et le DevOps. 
              À la recherche d’une opportunité à Dakar pour contribuer à des projets 
              d’infrastructure et d’automatisation.
            </p>
          </section>

          <section className="cv-main-section">
            <h3>RÉALISATIONS (PROJETS)</h3>
            <div className="cv-prj">
              <h5>Architecture Fullstack & Cloud Native</h5>
              <p>Application conteneurisée (Docker Compose) sur Debian. Reverse proxy Nginx, monitoring Prometheus/Grafana.</p>
            </div>
            <div className="cv-prj">
              <h5>Automatisation Infrastructure (IaC)</h5>
              <p>Provisionnement AWS (VPC, EC2) via Terraform. Pipelines Jenkins pour le CI/CD.</p>
            </div>
            <div className="cv-prj">
              <h5>Gouvernance d'Identités</h5>
              <p>Administration OpenLDAP et Microsoft Exchange en environnement Active Directory.</p>
            </div>
          </section>

          <section className="cv-main-section">
            <h3>FORMATION & CERTIFS</h3>
            <div className="cv-edu">
              <h5>Orange Digital Center (ODC)</h5>
              <p>Spécialisation Cloud & DevOps (AWS, Docker, K8s)</p>
            </div>
            <div className="cv-edu">
              <h5>Institut Supérieur d'Informatique (ISI)</h5>
              <p>Licence Administration Systèmes & Réseaux</p>
            </div>
            <div className="cv-edu">
              <h5>UNCHK</h5>
              <p>Informatique Développement d'Application</p>
            </div>
            <div className="cv-cert-grid">
              <div className="cv-cert"><strong>AWS Certified</strong> Practitioner</div>
              <div className="cv-cert"><strong>Cisco CCNA</strong> Introduction to Networks / Switching, Routing, and Wireless Essentials</div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CV;
