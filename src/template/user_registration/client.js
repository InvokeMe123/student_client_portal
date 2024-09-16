import React, { useState } from 'react';

const ClientForm = () => {
  const [clientData, setClientData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setClientData({ ...clientData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(clientData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={clientData.companyName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="contactName"
        placeholder="Contact Name"
        value={clientData.contactName}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={clientData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={clientData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default ClientForm;
