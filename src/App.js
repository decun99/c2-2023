import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [ip, setIp] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState('');
  const [geoData, setGeoData] = useState(null);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setIp(value);
    setButtonDisabled(!isValidIp(value));
    setError(isValidIp(value) ? '' : 'Formato de IP inválido');
  };

  const isValidIp = (ip) => {
    const pattern = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return pattern.test(ip);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://ipinfo.io/${ip}/geo`);
      if (response.status === 200) {
        setGeoData(response.data);
        setError('');
      } else {
        setError('Error al consultar la información de la IP.');
      }
    } catch (error) {
      setError('Error al consultar la información de la IP.');
    }
  };

  return (
    <div>
      <h1>CONTROL 2 TEL-335</h1>
      <input type="text" value={ip} onChange={handleInputChange} />
      {error && <p>{error}</p>}
      <button disabled={buttonDisabled} onClick={handleSearch}>
        Buscar
      </button>
      {geoData && (
        <div>
          <h2>Información de la IP</h2>
          <ul>
            <li>IP: {geoData.ip}</li>
            <li>Hostname: {geoData.hostname}</li>
            <li>City: {geoData.city}</li>
            <li>Region: {geoData.region}</li>
            <li>Country: {geoData.country}</li>
            <li>Loc: {geoData.loc}</li>
            <li>Org: {geoData.org}</li>
            <li>Postal: {geoData.postal}</li>
            <li>Timezone: {geoData.timezone}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
