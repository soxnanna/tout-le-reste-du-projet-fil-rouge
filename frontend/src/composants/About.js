import React from 'react';

function About() {
  return (
    <div className="about-page">
      <div className="about-header" style={{ textAlign: 'center', marginBottom: '6rem' }}>
        <h1 className="section-title">Mon <span>Parcours</span></h1>
        <p className="section-subtitle" style={{ color: 'var(--text-muted)' }}>L'évolution de mes compétences et de ma passion pour la technologie.</p>
      </div>

      <div className="timeline-container">
        <div className="timeline-line"></div>

        {/* Step 1: BAC */}
        <div className="timeline-item">
          <div className="timeline-content">
            <h3>Baccalauréat Littéraire</h3>
            <p>
              C'est ici que tout commence. Ce diplôme m'a apporté une grande curiosité intellectuelle, 
              une excellente maîtrise de la communication et une rigueur d'analyse qui me servent 
              chaque jour dans la résolution de problèmes techniques complexes.
            </p>
          </div>
          <div className="timeline-dot"></div>
        </div>

        {/* Step 2: ODC */}
        <div className="timeline-item">
          <div className="timeline-content">
            <h3>Formation Cloud, Dev & DevOps (ODC)</h3>
            <p>
              Formation intensive à Orange Digital Center (ODC) via le programme AWS Re/Start. 
              J'y ai acquis les fondamentaux du Cloud Computing et une expertise solide en 
              Développement et culture DevOps pour automatiser les infrastructures.
            </p>
            <div className="timeline-tags">
              <span className="tag">AWS</span>
              <span className="tag">Cloud</span>
              <span className="tag">ODC</span>
            </div>
          </div>
          <div className="timeline-dot"></div>
        </div>

        {/* Step 3: ISI */}
        <div className="timeline-item">
          <div className="timeline-content">
            <h3>Licence en Administration Systèmes & Réseaux (ISI)</h3>
            <p>
              Obtention de ma licence à l'Institut Supérieur d'Informatique (ISI). 
              Une immersion profonde dans l'architecture des réseaux, la sécurité, 
              et la gestion avancée des serveurs Windows/Linux et services réseaux.
            </p>
            <div className="timeline-tags">
              <span className="tag">Cisco</span>
              <span className="tag">Linux</span>
              <span className="tag">Network</span>
            </div>
          </div>
          <div className="timeline-dot"></div>
        </div>

        {/* Step 4: UNCHK */}
        <div className="timeline-item">
          <div className="timeline-content">
            <h3>Licence Pro Développement d'Applications</h3>
            <p>
              Actuellement à l'Université Cheikh Hamidou Kane (UNCHK), je me spécialise dans la création d'applications modernes. 
              Je fais le pont entre les infrastructures réseaux et le code pour devenir une développeuse Fullstack polyvalente.
            </p>
            <div className="timeline-tags">
              <span className="tag">React</span>
              <span className="tag">Node.js</span>
              <span className="tag">Fullstack</span>
            </div>
          </div>
          <div className="timeline-dot"></div>
        </div>
      </div>
    </div>
  );
}

export default About;
