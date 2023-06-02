import React, { useState } from 'react';

const Input = ({ onIpSubmit }) => {
  const [ip, setIp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onIpSubmit(ip);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Enter an IP address"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Input;
