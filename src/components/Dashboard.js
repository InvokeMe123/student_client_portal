import React from 'react';

const Dashboard = () => {
  return (
    <div style={dashboardStyles.container}>
      <h2>Welcome, Student!</h2>
      <div style={dashboardStyles.cards}>
        <div style={dashboardStyles.card}>
          <h3>Your Courses</h3>
          <p>Overview of your current courses and progress.</p>
        </div>
        <div style={dashboardStyles.card}>
          <h3>Upcoming Tasks</h3>
          <p>Check out what's due soon.</p>
        </div>
        <div style={dashboardStyles.card}>
          <h3>Messages</h3>
          <p>You have new unread messages.</p>
        </div>
      </div>
    </div>
  );
};

const dashboardStyles = {
  container: {
    textAlign: 'center',
    padding: '20px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    borderRadius: '5px',
  },
  cards: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  card: {
    padding: '10px',
    margin: '10px',
    flexGrow: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
  }
};

export default Dashboard;
