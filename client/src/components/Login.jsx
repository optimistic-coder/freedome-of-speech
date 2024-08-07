import React, { useContext, useState } from 'react';
import { EthContext } from '../contexts/EthContext';

const Login = () => {
  const { account, contract } = useContext(EthContext);
  const [userHash, setUserHash] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginName, setLoginName] = useState('');

  const handleLogin = async () => {
    try {
      const result = await contract.methods.login(userHash).send({ from: account });
      setLoginUsername(result.events.UserLoggedIn.returnValues.username);
      setLoginName(result.events.UserLoggedIn.returnValues.name);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={userHash}
        onChange={(e) => setUserHash(e.target.value)}
        placeholder="User Hash"
      />
      <button onClick={handleLogin}>Login</button>
      <p>Username: {loginUsername}</p>
      <p>Name: {loginName}</p>
    </div>
  );
};

export default Login;
