import React, { useContext } from 'react';
import { EthContext } from '../contexts/EthContext';

const Logout = ({ onLogout }) => {
  const { account, contract } = useContext(EthContext);

  const handleLogout = async () => {
    try {
      await contract.methods.logout().send({ from: account });
      onLogout();
      console.log('Logged out');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <div>
      <h2>Logout</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
