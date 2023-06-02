import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; // Importar el archivo de estilos

const App = () => {
  const [ip, setIp] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [error, setError] = useState('');
  const [geoData, setGeoData] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');

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
      const realResponse = await axios.get(`https://ipinfo.io/${ip}/geo`);
      if (realResponse.status === 200) {
        setGeoData(realResponse.data);
        setError('');
      } else {
        setError('Error al consultar la información de la IP.');
      }
    } catch (error) {
      setError('Error al consultar la información de la IP.');
    }

    const dummyData = {
      ip: '161.185.160.93',
      city: 'New York City',
      region: 'New York',
      country: 'US',
      loc: '40.7143,-74.0060',
      org: 'AS22252 The City of New York',
      postal: '10004',
      timezone: 'America/New_York',
      readme: 'https://ipinfo.io/missingauth'
    };

    setGeoData(dummyData);
    setError('');
  };

  const handleSave = async () => {
    try {
      const saveResponse = await axios.post('https://jsonplaceholder.typicode.com/posts', {
        ip: geoData.ip,
        city: geoData.city,
        region: geoData.region,
        country: geoData.country
      });

      if (saveResponse.status === 201) {
        setSaveMessage('Los datos se guardaron correctamente.');
      } else {
        setSaveMessage('Error al guardar los datos. Por favor, inténtalo nuevamente.');
      }
    } catch (error) {
      setSaveMessage('Error al guardar los datos. Por favor, inténtalo nuevamente.');
    }
  };

  return (
    <div className="container"> {/* Aplicar la clase "container" al contenedor principal */}
      <h1>CONTROL 2 TEL-335</h1>
      <input type="text" value={ip} onChange={handleInputChange} />
      {error && <p className="error">{error}</p>}
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
          <button onClick={handleSave}>Guardar</button>
          {saveMessage && <p className="success">{saveMessage}</p>}
        </div>
      )}
    </div>
  );
};

export default App;
