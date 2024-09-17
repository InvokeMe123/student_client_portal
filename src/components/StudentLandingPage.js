import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileComponent = () => (
  <div style={styles.fullContent}>
    <div style={styles.profileHeader}>
      <img src="path_to_profile_image.jpg" alt="Profile" style={styles.profileImage} />
      <div>
        <h3>Mr Harmanjot Singh</h3>
        <p>SAE9914</p>
      </div>
    </div>
    <div style={styles.profileDetails}>
      <div style={styles.profileSection}>
        <h4>General Info</h4>
        <p><strong>Student No:</strong> SAE9914</p>
        <p><strong>Email:</strong> Harmanjot5402@gmail.com</p>
        <p><strong>Contact:</strong> +61 0468422007</p>
        <p><strong>City of Birth:</strong> SUBAKHERA, HARYANA</p>
        <p><strong>Nationality:</strong> Indian</p>
        <p><strong>Passport Expiry:</strong> 14-09-2031</p>
      </div>
    </div>
  </div>
);

// Additional components unchanged, can add similar detail level as needed
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
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  profileImage: {
    marginRight: '20px',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
  },
  profileDetails: {
    display: 'flex',
    flexDirection: 'column',
  },
  profileSection: {
    marginBottom: '10px',
  }
};

export default StudentLandingPage;
