import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';  // Import useHistory for navigation

const CreateGroup = () => {
  const [groupname, setGroupname] = useState('');
  const [projectTitle, setProjectTitle] = useState('');
  const [description, setDescription] = useState('');
  const [listOfStudents, setListOfStudents] = useState('');
  const [singleClient, setSingleClient] = useState('');
  const [file, setFile] = useState(null);
  //const [teacher, setTeacher] = useState('');  // Assume this is the logged-in teacher's name

  const history = useHistory();  // For navigation

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      groupname,
      projectTitle,
      description,
      listOfStudents,
      singleClient,
      file,
      //teacher
    });
    // Handle form submission logic here
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleDeleteFile = () => {
    setFile(null);
  };

  const handleBack = () => {
    history.goBack();  // Navigate back to the previous page
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h1 style={styles.header}>Create Group</h1>
        {renderInput('Group Name:', groupname, setGroupname)}
        {renderInput('Project Title:', projectTitle, setProjectTitle)}
        {renderTextArea('Description:', description, setDescription)}
        {renderInput('List of Students:', listOfStudents, setListOfStudents)}
        {renderInput('Client:', singleClient, setSingleClient)}
        {renderFileInput('File:', file, handleFileChange, handleDeleteFile)}
       
        <div style={styles.buttonGroup}>
          <button type="button" onClick={handleBack} style={styles.backButton}>Back</button>
          <button type="submit" style={styles.button}>Create</button>
        </div>
      </form>
    </div>
  );
};

const renderInput = (label, value, onChange, readOnly = false) => (
  <label style={styles.label}>
    {label}
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={styles.input}
      readOnly={readOnly}
    />
  </label>
);

const renderTextArea = (label, value, onChange) => (
  <label style={styles.label}>
    {label}
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={styles.textarea}
    />
  </label>
);

const renderFileInput = (label, file, onChange, onDelete) => (
  <label style={styles.label}>
    {label}
    <input
      type="file"
      onChange={onChange}
      style={styles.input}
    />
    {file && <button onClick={onDelete} style={styles.deleteButton}>Delete</button>}
  </label>
);

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '',
  },
  form: {
    width: '100%',
    maxWidth: '600px',
    padding: '24px',
    margin: '16px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 1px 2px rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)', // Google Shadows
    boxSizing: 'border-box',
  },
  header: {
    marginBottom: '24px',
    color: '#202124', // Google text color
    fontSize: '24px',
  },
  label: {
    display: 'block',
    marginBottom: '16px',
    color: '#202124',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '10px 8px',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#5f6368',
    backgroundColor: '#fff',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    minHeight: '120px',
    padding: '10px 8px',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#5f6368',
    backgroundColor: '#fff',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '24px',
  },
  backButton: {
    marginRight: '8px',
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#f1f3f4',
    color: '#3c4043',
    border: '1px solid #dadce0',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  button: {
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#1a73e8',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  deleteButton: {
    marginLeft: '10px',
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#f28b82',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  }
};

export default CreateGroup;
