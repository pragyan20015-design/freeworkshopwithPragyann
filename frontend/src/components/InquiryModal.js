import React, { useState } from 'react';
import { submitInquiry } from '../services/api';

function InquiryModal({ personalClasses, selectedClass, onClose }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    selectedClass: selectedClass || '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await submitInquiry(form);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Book a Personal Session</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        {success ? (
          <div className="success-state">
            <span className="success-icon">✅</span>
            <h3>Inquiry Submitted!</h3>
            <p>
              Thank you, <strong>{form.name}</strong>! We'll get back to you at{' '}
              <strong>{form.email}</strong> shortly.
            </p>
            <button className="btn btn-primary" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="inquiry-form" id="contact">
            {error && <div className="alert alert-error">{error}</div>}
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="selectedClass">Select Class *</label>
              <select
                id="selectedClass"
                name="selectedClass"
                value={form.selectedClass}
                onChange={handleChange}
                required
              >
                <option value="">-- Choose a class --</option>
                {personalClasses.map((cls) => (
                  <option key={cls._id} value={cls.title}>
                    {cls.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Any questions or specific requirements…"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={submitting}
            >
              {submitting ? 'Submitting…' : 'Submit Inquiry'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default InquiryModal;
