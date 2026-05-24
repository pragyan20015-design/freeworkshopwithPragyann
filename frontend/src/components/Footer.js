import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="brand-icon">🌿</span>
          <span className="brand-name">Pragyan</span>
          <p>Empowering learners one session at a time.</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="#workshops">Workshops</a>
          <a href="#personal-classes">Personal Classes</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer-contact" id="contact-footer">
          <h4>Contact</h4>
          <p>📧 info@pragyan.edu</p>
          <p>📞 +1 (555) 000-1234</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Pragyan. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
