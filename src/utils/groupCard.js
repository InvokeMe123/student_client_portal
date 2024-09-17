import React from 'react';

const GroupCard = ({ groupName, projectTitle, studentEmails, description, fileUrl }) => {
  return (
    <div style={styles.cardContainer}>
      <h2 style={styles.cardTitle}>{groupName}</h2>
      <h4 style={styles.cardSubtitle}>{projectTitle}</h4>
      <p><strong>Students:</strong> {studentEmails.join(', ')}</p>
      <p><strong>Description:</strong> {description}</p>
      <div style={styles.buttonGroup}>
        <button onClick={() => window.open(fileUrl, "_blank")} style={styles.viewButton}>View File</button>
        <a href={fileUrl} download style={styles.downloadLink}>Download</a>
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    margin: '20px',
    maxWidth: '600px',
    width: '100%',
  },
  cardTitle: {
    color: '#1a73e8',
    fontSize: '22px',
    marginBottom: '10px',
  },
  cardSubtitle: {
    color: '#333',
    fontSize: '18px',
    marginBottom: '10px',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
  },
  viewButton: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  downloadLink: {
    padding: '10px 20px',
    fontSize: '14px',
    backgroundColor: '#0077cc',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center'
  }
};

export default GroupCard;
