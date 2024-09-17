import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileComponent = () => (
  <div style={styles.fullContent}>
    <h3>Profile</h3>
    <p>Details about the client profile will appear here.</p>
  </div>
);

const ProjectsComponent = () => (
  <div style={styles.fullContent}>
    <h3>Projects</h3>
    <p>List of projects the client is involved in.</p>
  </div>
);

const CommunicationsComponent = () => (
  <div style={styles.fullContent}>
    <h3>Communications</h3>
    <p>Interactive chat system to communicate with project teams or support staff.</p>
  </div>
);

const SupportComponent = () => (
  <div style={styles.fullContent}>
    <h3>Client Support</h3>
    <p>Contact details and emails for client-specific support.</p>
  </div>
);

const AnnouncementsWidget = () => (
  <div style={styles.fullContent}>
    <h3>Business Announcements</h3>
    <ul>
      <li>Upcoming project milestones.</li>
      <li>Updates on business operations or changes.</li>
    </ul>
  </div>
);

const ClientLandingPage = () => {
  const [activeSection, setActiveSection] = useState('announcements');

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.home} onClick={() => setActiveSection('announcements')}>HOME</div>
        <div style={styles.portalName}>Client Portal</div>
        <div style={styles.menuItem} onClick={() => setActiveSection('profile')}>My Profile</div>
        <div style={styles.menuItem} onClick={() => setActiveSection('projects')}>Projects</div>
        <div style={styles.menuItem} onClick={() => setActiveSection('communications')}>Messages</div>
        <div style={styles.menuItem} onClick={() => setActiveSection('support')}>Support</div>
      </div>
      <div style={styles.content}>
        {activeSection === 'profile' && <ProfileComponent />}
        {activeSection === 'projects' && <ProjectsComponent />}
        {activeSection === 'communications' && <CommunicationsComponent />}
        {activeSection === 'support' && <SupportComponent />}
        {activeSection === 'announcements' && <AnnouncementsWidget />}
      </div>
    </div>
  );
};

// Styles adapted from the provided StudentLandingPage styles
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f4f4f9',
  },
  sidebar: {
    width: '255px',
    height: '100vh',
    backgroundColor: '#902bf5',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  home: {
    color: 'white',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  portalName: {
    color: 'white',
    marginBottom: '40px',
    fontSize: '18px',
    textAlign: 'center',
  },
  menuItem: {
    backgroundColor: '#902bf5',
    color: 'white',
    padding: '25px 0',
    margin: '25px 0',
    width: '90%',
    borderRadius: '6px',
    textAlign: 'center',
    textDecoration: 'none',  
    fontSize: '18px',
    display: 'block',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2), 0 -4px 8px rgba(0,0,0,0.1), -4px 0 8px rgba(0,0,0,0.1), 4px 0 8px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    cursor: 'pointer',
    ':hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.25), 0 -6px 12px rgba(0,0,0,0.15), -6px 0 12px rgba(0,0,0,0.15), 6px 0 12px rgba(0,0,0,0.15)',
    },
  },
  content: {
    flex: 1,
    backgroundColor: 'white',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  fullContent: {
    width: '100%',
    padding: '40px 50px',
    margin: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
};

export default ClientLandingPage;
