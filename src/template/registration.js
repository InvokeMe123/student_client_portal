import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';



const RegistrationForm = () => {
  const [userType, setUserType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    extraField: '' // This will hold the major for students, or company name for clients, etc.
  });
  const history = useHistory(); // Initialize useHistory hook

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Function to navigate to login screen
  const navigateToLogin = () => {
    history.push('/login'); // Navigate to login page
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(userType, formData);
    // Handle form submission logic here
  };

  const renderExtraField = () => {
    if (userType === 'student') {
      return (
        <div className="input-group">
          <label>Major</label>
          <input type="text" name="extraField" value={formData.extraField} onChange={handleChange} required />
        </div>
      );
    } else if (userType === 'client') {
      return (
        <div className="input-group">
          <label>Company Name</label>
          <input type="text" name="extraField" value={formData.extraField} onChange={handleChange} required />
        </div>
      );
    } else if (userType === 'teacher') {
      return (
        <div className="input-group">
          <label>Subject</label>
          <input type="text" name="extraField" value={formData.extraField} onChange={handleChange} required />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="form-container">
      <div className="form-header">Create Your Account</div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>User Type</label>
          <select name="userType" value={userType} onChange={(e) => setUserType(e.target.value)} required>
            <option value="">Select User Type</option>
            <option value="client">Client</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>
        <div className="input-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label>Retype Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        {renderExtraField()}
        <button type="submit" className="submit-button">Register</button>
      </form>
      <div className="bottom-text">
        Already have an account? <button onClick={navigateToLogin} style={{background: 'none', border: 'none', color: 'blue', cursor: 'pointer'}}>Sign in</button>
      </div>

    </div>
  );
};

export default RegistrationForm;
