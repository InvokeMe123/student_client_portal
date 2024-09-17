import React from 'react';
import { Link } from 'react-router-dom';

const StudentLandingPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.logo}>LOGO</div>
        <div style={styles.portalName}>Student Login Portal</div>
        <Link to="/profile" style={styles.menuItem}>My Profile</Link>
        <Link to="/courses" style={styles.menuItem}>My Courses</Link>
        <Link to="/messages" style={styles.menuItem}>Messages</Link>
        <Link to="/support" style={styles.menuItem}>Support</Link>
      </div>
      <div style={styles.content}>
        {/* Content area could be detailed based on the selected link */}
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
    width: '200px',
    height: '100vh',
    backgroundColor: '#9eedf0', // Light green background
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
  },
  logo: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  portalName: {
    marginBottom: '40px',
    fontSize: '16px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  menuItem: {
    backgroundColor: '#9eedf0', // Richer green shade for the buttons
    color: 'black',
    padding: '30px 10px', // Increased padding for a square look
    margin: '10px 0',
    width: '90%', // Adjusted to make buttons wider
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    display: 'block',
    boxShadow: '8px 8px 8px rgba(0.1,0.1,0.1,0.1)', // Shadow for elevation
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition for hover effect
  },
};

export default StudentLandingPage;
