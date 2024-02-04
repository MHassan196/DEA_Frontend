import React, { useState } from 'react';
import './MainPage.css'; // Your CSS file for styling

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData); // For demonstration, you can send this data to an API or perform other actions
  };

  return (
    <div className="cont-text">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit} className='cont-form'>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className='cont-inp'
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className='cont-inp'
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className='cont-inp'
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className='cont-inp'
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className='cont-msg'
            required
            rows="6"
          ></textarea>
        </div>
        <div className='upload'>

        <button type="submit" className='upload-btn cont-btn'>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm; 