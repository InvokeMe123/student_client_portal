import React, { useState } from 'react';

const StudentForm = () => {
  const [studentData, setStudentData] = useState({
    fullName: '',
    email: '',
    password: '',
    major: '',
  });

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(studentData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={studentData.fullName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={studentData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={studentData.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="major"
        placeholder="Major"
        value={studentData.major}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default StudentForm;
