import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GeoData = ({ ip }) => {
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
    <div>
      <h1>Geo Data</h1>
      {geoData && (
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
      )}
    </div>
  );
};

export default GeoData;
