import React, { useContext, useState } from 'react';
import { EthContext } from '../contexts/EthContext'; 

const Logout = ({ onLogout }) => {
  const { account, contract } = useContext(EthContext);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setError('');
    if (!account) {
      setError('No user is logged in.');
      return;
    }
    setIsLoading(true);
    try {
      await contract.methods.logout().send({ from: account });
      console.log('Logged out');
      localStorage.removeItem('userHash');
    } catch (error) {
      console.error('Logout failed', error);
      setError('Logout failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="logout-container">
      <h2 className="logout-heading">Logout</h2>
      <button onClick={handleLogout} className="logout-button" disabled={isLoading}>
        {isLoading ? 'Logging out...' : 'Logout'}
      </button>
      {error && <p className="logout-error">{error}</p>}
    </div>
  );
};

export default Logout;
