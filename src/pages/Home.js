import React, { useEffect, useState } from 'react';
import api from '../api';

const Home = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return setMessage('Unauthorized access');

      try {
        const response = await api.get('/protected', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage(response.data.message);
      } catch (error) {
        setMessage('Unauthorized access');
      }
    };

    fetchData();
  }, []);

  return <div><h2>Home</h2><p>{message}</p></div>;
};

export default Home;
