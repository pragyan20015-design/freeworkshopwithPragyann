import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkshopsSection from './components/WorkshopsSection';
import PersonalClassesSection from './components/PersonalClassesSection';
import InquiryModal from './components/InquiryModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';
import {
  getWorkshops,
  getPersonalClasses,
  adminLogout
} from './services/api';

function App() {
  const [workshops, setWorkshops] = useState([]);
  const [personalClasses, setPersonalClasses] = useState([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);
  const [loadingClasses, setLoadingClasses] = useState(true);

  const [isAdmin, setIsAdmin] = useState(
    () => !!sessionStorage.getItem('adminToken')
  );
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');

  const fetchWorkshops = useCallback(async () => {
    try {
      setLoadingWorkshops(true);
      const data = await getWorkshops();
      setWorkshops(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingWorkshops(false);
    }
  }, []);

  const fetchPersonalClasses = useCallback(async () => {
    try {
      setLoadingClasses(true);
      const data = await getPersonalClasses();
      setPersonalClasses(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingClasses(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkshops();
    fetchPersonalClasses();
  }, [fetchWorkshops, fetchPersonalClasses]);

  const handleLoginSuccess = (token) => {
    sessionStorage.setItem('adminToken', token);
    setIsAdmin(true);
    setShowAdminLogin(false);
    setShowAdminPanel(true);
  };

  const handleLogout = async () => {
    try {
      await adminLogout();
    } catch (_) {}
    sessionStorage.removeItem('adminToken');
    setIsAdmin(false);
    setShowAdminPanel(false);
  };

  const openInquiry = (className) => {
    setSelectedClass(className);
    setShowInquiryModal(true);
  };

  return (
    <div className="app">
      <Navbar
        isAdmin={isAdmin}
        onAdminClick={() =>
          isAdmin ? setShowAdminPanel(true) : setShowAdminLogin(true)
        }
        onLogout={handleLogout}
      />

      <main>
        <Hero />
        <WorkshopsSection
          workshops={workshops}
          loading={loadingWorkshops}
        />
        <PersonalClassesSection
          personalClasses={personalClasses}
          loading={loadingClasses}
          onBook={openInquiry}
        />
      </main>

      <Footer />

      {showInquiryModal && (
        <InquiryModal
          personalClasses={personalClasses}
          selectedClass={selectedClass}
          onClose={() => setShowInquiryModal(false)}
        />
      )}

      {showAdminLogin && (
        <AdminLoginModal
          onClose={() => setShowAdminLogin(false)}
          onSuccess={handleLoginSuccess}
        />
      )}

      {showAdminPanel && (
        <AdminPanel
          workshops={workshops}
          onClose={() => setShowAdminPanel(false)}
          onWorkshopsChange={fetchWorkshops}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;
