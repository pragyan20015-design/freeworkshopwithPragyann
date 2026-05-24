import React from 'react';

function WorkshopsSection({ workshops, loading }) {
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <section id="workshops" className="section">
      <div className="section-header">
        <h2>Upcoming Workshops</h2>
        <p>Join our free and community workshops to expand your knowledge.</p>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading workshops…</div>
      ) : workshops.length === 0 ? (
        <div className="empty-state">
          <span>📅</span>
          <p>No workshops scheduled yet. Check back soon!</p>
        </div>
      ) : (
        <div className="cards-grid">
          {workshops.map((ws) => (
            <div key={ws._id} className={`card workshop-card ${ws.isCustom ? 'custom-badge-card' : ''}`}>
              {ws.isCustom && <span className="badge">Custom</span>}
              <div className="card-icon">🎓</div>
              <h3 className="card-title">{ws.title}</h3>
              <div className="card-details">
                <div className="detail-row">
                  <span className="detail-icon">📅</span>
                  <span>{ws.day}, {formatDate(ws.date)}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-icon">🕐</span>
                  <span>{ws.startTime} – {ws.endTime}</span>
                </div>
                {ws.link && (
                  <div className="detail-row">
                    <span className="detail-icon">🔗</span>
                    <a
                      href={ws.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      Join Meeting
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default WorkshopsSection;
