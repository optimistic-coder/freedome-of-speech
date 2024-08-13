import React, { useContext, useState } from 'react';
import { EthContext } from '../contexts/EthContext'; 

const Registration = () => {
  const { account, contract } = useContext(EthContext);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [userHash, setUserHash] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    setError('');
    if (!username.trim() || !name.trim()) {
      setError('Username and Name are required.');
      return;
    } 
    setIsLoading(true);
    try {
      const result = await contract.methods.register(username, name).send({ from: account });
      console.log('Registered:', result);
      const userHash = result.events.UserRegistered.returnValues.userHash;
      setUserHash(userHash);
      localStorage.setItem('userHash', userHash);
    } catch (error) {
      console.error('Registration failed', error);
      setError('Registration failed. Please try again.');
    } finally { 
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      <div className="register-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="register-input"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="register-input"
        />
        <button onClick={handleRegister} className="register-button" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </div>
      {error && <p className="register-error">{error}</p>}
      {userHash && <p className="register-hash">Hash: {userHash}</p>}
    </div>
  );
};

export default Registration;
