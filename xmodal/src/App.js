import React, { useState } from 'react';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: ''
  });

  const [errors, setErrors] = useState({});

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const validateForm = () => {
    let validationErrors = {};
    const today = new Date().toISOString().split('T')[0];

    if (!formData.username) validationErrors.username = 'Username is required.';
    if (!formData.email) validationErrors.email = 'Email is required.';
    else if (!formData.email.includes('@')) validationErrors.email = 'Invalid email. Please check your email address.';
    if (!formData.phone) validationErrors.phone = 'Phone number is required.';
    else if (formData.phone.length !== 10 || isNaN(formData.phone)) validationErrors.phone = 'Invalid phone number. Please enter a 10-digit phone number.';
    if (!formData.dob) validationErrors.dob = 'Date of Birth is required.';
    else if (formData.dob > today) validationErrors.dob = 'Invalid Date of Birth. Please enter a valid past date.';

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Reset form and close modal
      setFormData({ username: '', email: '', phone: '', dob: '' });
      setErrors({});
      closeModal();
    } else {
      Object.values(errors).forEach(error => {
        alert(error);
      });
    }
  };

  return (
    <div className="App">
      <h1>User Details Modals</h1>
      <button onClick={openModal}>Open Form</button>

      {isModalOpen && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <h1>Full Details</h1>
              <div>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" value={formData.username} onChange={handleInputChange} />
                {errors.username && <div className="error">{errors.username}</div>}
              </div>
              <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={formData.email} onChange={handleInputChange} />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>
              <div>
                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" value={formData.phone} onChange={handleInputChange} />
                {errors.phone && <div className="error">{errors.phone}</div>}
              </div>
              <div>
                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" value={formData.dob} onChange={handleInputChange} />
                {errors.dob && <div className="error">{errors.dob}</div>}
              </div>
              <button className="submit-button" type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
