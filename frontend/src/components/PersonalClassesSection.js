import React from 'react';

const classIcons = {
  'Computer Class (Grades 2–5)': '💻',
  'Python Basics': '🐍'
};

function PersonalClassesSection({ personalClasses, loading, onBook }) {
  return (
    <section id="personal-classes" className="section section-alt">
      <div className="section-header">
        <h2>Personal Classes</h2>
        <p>
          One-on-one and small group sessions tailored to your learning pace.
        </p>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading classes…</div>
      ) : personalClasses.length === 0 ? (
        <div className="empty-state">
          <span>📖</span>
          <p>No personal classes available right now.</p>
        </div>
      ) : (
        <div className="cards-grid">
          {personalClasses.map((cls) => (
            <div key={cls._id} className="card class-card">
              <div className="card-icon">
                {classIcons[cls.title] || '📘'}
              </div>
              <h3 className="card-title">{cls.title}</h3>
              <p className="card-description">{cls.description}</p>
              <div className="card-tags">
                {cls.level && <span className="tag">{cls.level}</span>}
                {cls.duration && <span className="tag">{cls.duration}</span>}
                {cls.price && <span className="tag tag-price">{cls.price}</span>}
              </div>
              <button
                className="btn btn-primary btn-full"
                onClick={() => onBook(cls.title)}
              >
                Book a Session
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default PersonalClassesSection;
