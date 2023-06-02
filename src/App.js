import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GeoData from './components/GeoData';
import Input from './components/Input';

const App = () => {
  const [ip, setIp] = useState('');
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://ipinfo.io/${ip}/geo`);
        setGeoData(response.data);
      } catch (error) {
        console.error('Error fetching geo data:', error);
      }
    };

    if (ip) {
      fetchData();
    }
  }, [ip]);

  return (
    <div className="App">
      <h1>CONTROL 2 TEL-335</h1>
      <Input onIpSubmit={setIp} />
      <GeoData ip={ip} geoData={geoData} />
    </div>
  );
};

export default App;
