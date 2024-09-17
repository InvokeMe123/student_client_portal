import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Define content widgets
const ProfileComponent = () => (
  <div style={styles.fullContent}>
    <h3>My Profile</h3>
    <p>Details about your profile will appear here.</p>
  </div>
);

const CoursesComponent = () => (
  <div style={styles.fullContent}>
    <h3>My Courses</h3>
    <p>List of courses and subjects you are enrolled in.</p>
  </div>
);

const MessagesComponent = () => (
  <div style={styles.fullContent}>
    <h3>Messages</h3>
    <p>Interactive chat system to communicate with teachers and students.</p>
  </div>
);

const SupportComponent = () => (
  <div style={styles.fullContent}>
    <h3>Support</h3>
    <p>Contact details and emails for support.</p>
  </div>
);

const AnnouncementsWidget = () => (
  <div style={styles.fullContent}>
    <h3>Announcements</h3>
    <ul>
      <li>New library resources are now available online.</li>
      <li>Office hours for Prof. Smith have changed.</li>
    </ul>
  </div>
);

const StudentLandingPage = () => {
  const [activeSection, setActiveSection] = useState('announcements');  // Default section

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.logo} onClick={() => setActiveSection('announcements')}>LOGO</div>
        <div style={styles.portalName}>Student Portal</div>
        <div style={styles.menuItem} onClick={() => setActiveSection('profile')}>My Profile</div>
        <div style={styles.menuItem} onClick={() => setActiveSection('courses')}>My Courses</div>
        <div style={styles.menuItem} onClick={() => setActiveSection('messages')}>Messages</div>
        <div style={styles.menuItem} onClick={() => setActiveSection('support')}>Support</div>
      </div>
      <div style={styles.content}>
        {activeSection === 'profile' && <ProfileComponent />}
        {activeSection === 'courses' && <CoursesComponent />}
        {activeSection === 'messages' && <MessagesComponent />}
        {activeSection === 'support' && <SupportComponent />}
        {activeSection === 'announcements' && <AnnouncementsWidget />}
      </div>
    </div>
  );
};

// Define CSS styles
const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f4f4f9',
  },
  sidebar: {
    width: '255px',
    height: '100vh',
    backgroundColor: '#75faf8',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  logo: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  portalName: {
    marginBottom: '40px',
    fontSize: '16px',
    textAlign: 'center',
  },
  menuItem: {
    backgroundColor: '#75faf8',
    color: 'black',
    padding: '45px 0',
    margin: '20px 0',
    width: '90%',
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
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
    width: '100%', // Ensures the content uses the full area
    padding: '40px 50px',
    margin: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
};

export default StudentLandingPage;
