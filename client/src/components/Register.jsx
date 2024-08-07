import React, { useContext, useState } from 'react';
import { EthContext } from '../contexts/EthContext';

const Registration = () => {
  const { account, contract } = useContext(EthContext);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [userHash, setUserHash] = useState('');

  const handleRegister = async () => {
    try {
      const result = await contract.methods.register(username, name).send({ from: account });
      console.log('Registered:', result);
      const userHash = result.events.UserRegistered.returnValues.userHash;
      setUserHash(userHash);
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <button onClick={handleRegister}>Register</button>
      <p>Hash: {userHash}</p>
    </div>
  );
};

export default Registration;
