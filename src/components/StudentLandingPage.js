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
    backgroundColor: '#f4f4f9', // Overall background
  },
  sidebar: {
    width: '255px',
    height: '100vh',
    backgroundColor: '#75faf8', // Light green background
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
  },
  menuItem: {
    backgroundColor: '#75faf8', // Richer green shade for the buttons
    color: 'black',
    padding: '45px 0', // Padding adjusted for square look
    margin: '20px 0', // More space between buttons
    width: '90%', // Width to make buttons fill the sidebar more
    textAlign: 'center',
    textDecoration: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    display: 'block',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2), 0 -4px 8px rgba(0,0,0,0.1), -4px 0 8px rgba(0,0,0,0.1), 4px 0 8px rgba(0,0,0,0.1)', // Shadow on all sides
    transition: 'transform 0.3s ease, box-shadow 0.3s ease', // Smooth transition for hover effect
    cursor: 'pointer', // Change cursor on hover to indicate interactivity
    ':hover': {
      transform: 'translateY(-2px)', // Slight lift
      boxShadow: '0 6px 12px rgba(0,0,0,0.25), 0 -6px 12px rgba(0,0,0,0.15), -6px 0 12px rgba(0,0,0,0.15), 6px 0 12px rgba(0,0,0,0.15)' // Deeper shadow on hover on all sides
    }
  },
  
  
  content: {
    flex: 1,
    backgroundColor: 'white',
    padding: '20px',
  },
};

export default StudentLandingPage;
