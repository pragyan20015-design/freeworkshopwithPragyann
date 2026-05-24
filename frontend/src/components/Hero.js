import React from 'react';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Learn. Grow. <span className="highlight">Thrive.</span>
        </h1>
        <p className="hero-subtitle">
          Discover upcoming workshops and personalized classes designed to help
          you build real skills — from computer basics for young learners to
          Python programming for all ages.
        </p>
        <div className="hero-actions">
          <a href="#workshops" className="btn btn-primary btn-large">
            View Workshops
          </a>
          <a href="#personal-classes" className="btn btn-outline btn-large">
            Personal Classes
          </a>
        </div>
      </div>
      <div className="hero-graphic">
        <div className="hero-card">
          <span className="hero-card-icon">📚</span>
          <p>Upcoming Workshops</p>
        </div>
        <div className="hero-card">
          <span className="hero-card-icon">💻</span>
          <p>Computer Basics</p>
        </div>
        <div className="hero-card">
          <span className="hero-card-icon">🐍</span>
          <p>Python Basics</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
