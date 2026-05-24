import React, { useState, useEffect, useCallback } from 'react';
import { addWorkshop, deleteWorkshop, getInquiries } from '../services/api';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function AdminPanel({ workshops, onClose, onWorkshopsChange, onLogout }) {
  const [activeTab, setActiveTab] = useState('workshops');
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [form, setForm] = useState({
    title: '',
    date: '',
    day: '',
    startTime: '',
    endTime: '',
    link: ''
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchInquiries = useCallback(async () => {
    setLoadingInquiries(true);
    try {
      const data = await getInquiries();
      setInquiries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingInquiries(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab === 'inquiries') fetchInquiries();
  }, [activeTab, fetchInquiries]);

  const handleFormChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setFormError('');
    setFormSuccess('');
  };

  const handleAddWorkshop = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setAdding(true);
    try {
      await addWorkshop(form);
      setFormSuccess('Workshop added successfully!');
      setForm({ title: '', date: '', day: '', startTime: '', endTime: '', link: '' });
      onWorkshopsChange();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this workshop?')) return;
    setDeletingId(id);
    try {
      await deleteWorkshop(id);
      onWorkshopsChange();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const formatDateTime = (isoStr) => {
    if (!isoStr) return '';
    return new Date(isoStr).toLocaleString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Admin Panel</h2>
          <div className="modal-header-actions">
            <button className="btn btn-secondary btn-sm" onClick={onLogout}>
              Logout
            </button>
            <button className="modal-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'workshops' ? 'active' : ''}`}
            onClick={() => setActiveTab('workshops')}
          >
            Manage Workshops
          </button>
          <button
            className={`tab ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            Student Inquiries
          </button>
        </div>

        {activeTab === 'workshops' && (
          <div className="admin-section">
            <h3>Add Custom Workshop</h3>
            <form onSubmit={handleAddWorkshop} className="admin-form">
              {formError && <div className="alert alert-error">{formError}</div>}
              {formSuccess && <div className="alert alert-success">{formSuccess}</div>}
              <div className="form-row">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleFormChange}
                    placeholder="Workshop title"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Day *</label>
                  <select name="day" value={form.day} onChange={handleFormChange} required>
                    <option value="">Select day</option>
                    {DAYS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Start Time *</label>
                  <input
                    name="startTime"
                    value={form.startTime}
                    onChange={handleFormChange}
                    placeholder="e.g. 10:00 AM"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>End Time *</label>
                  <input
                    name="endTime"
                    value={form.endTime}
                    onChange={handleFormChange}
                    placeholder="e.g. 12:00 PM"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Meeting Link (optional)</label>
                <input
                  name="link"
                  type="url"
                  value={form.link}
                  onChange={handleFormChange}
                  placeholder="https://meet.google.com/..."
                />
              </div>
              <button type="submit" className="btn btn-primary" disabled={adding}>
                {adding ? 'Adding…' : 'Add Workshop'}
              </button>
            </form>

            <h3 style={{ marginTop: '2rem' }}>All Workshops</h3>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {workshops.map((ws) => (
                    <tr key={ws._id}>
                      <td>{ws.title}</td>
                      <td>{ws.day}, {formatDate(ws.date)}</td>
                      <td>{ws.startTime} – {ws.endTime}</td>
                      <td>
                        <span className={`badge ${ws.isCustom ? 'badge-custom' : 'badge-default'}`}>
                          {ws.isCustom ? 'Custom' : 'Default'}
                        </span>
                      </td>
                      <td>
                        {ws.isCustom ? (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(ws._id)}
                            disabled={deletingId === ws._id}
                          >
                            {deletingId === ws._id ? '…' : 'Delete'}
                          </button>
                        ) : (
                          <span className="text-muted">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div className="admin-section">
            <h3>Student Inquiries ({inquiries.length})</h3>
            {loadingInquiries ? (
              <div className="loading-spinner">Loading inquiries…</div>
            ) : inquiries.length === 0 ? (
              <div className="empty-state">
                <span>📬</span>
                <p>No inquiries yet.</p>
              </div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Class</th>
                      <th>Message</th>
                      <th>Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((inq) => (
                      <tr key={inq._id}>
                        <td>{inq.name}</td>
                        <td>{inq.email}</td>
                        <td>{inq.phone || '—'}</td>
                        <td>{inq.selectedClass}</td>
                        <td className="message-cell">{inq.message || '—'}</td>
                        <td>{formatDateTime(inq.createdAt)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
