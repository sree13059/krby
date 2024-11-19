import React, { useState } from 'react';
import api from '../api';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true); // Start loading indicator
  //   setSuccessMessage('');
  //   setErrorMessage('');

  //   console.log('Submitting form with data:', formData); // Log the form data

  //   try {
  //     const response = await api.post('/register', formData);
  //     console.log('Response received:', response); // Log the full response

  //     if (response && response.data) {
  //       console.log('Success data:', response.data); // Log success data
  //       setSuccessMessage(response.data.message);
  //     }
  //   } catch (error) {
  //     console.error('Error during API request:', error); // Log the error object
  //     console.log('Error response:', error.response); // Log the error response

  //     // Check if error response exists and contains data
  //     if (error.response) {
  //       console.log('Error response data:', error.response.data); // Log error data
  //       setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
  //     } else {
  //       console.log('Network or unknown error'); // Log a message for network errors or unknown errors
  //       setErrorMessage('An error occurred. Please try again.');
  //     }
  //   } finally {
  //     setIsLoading(false); // Stop loading indicator
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
  
    // Basic email validation before submitting
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(formData.email)) {
      setIsLoading(false);
      setErrorMessage('Please enter a valid email address.');
      return;
    }
  
    try {
      const response = await api.post('/register', formData);
      if (response && response.data) {
        setSuccessMessage(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
      } else {
        setErrorMessage('An error occurred. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <h2>Register</h2>
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;
