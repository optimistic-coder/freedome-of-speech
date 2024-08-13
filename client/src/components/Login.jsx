import React, { useContext, useState } from 'react';
import { EthContext } from '../contexts/EthContext'; 

const Login = () => {
  const { account, contract } = useContext(EthContext);
  const [userHash, setUserHash] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    if (!userHash) {
      setError('User Hash is required.');
      return;
    }
    setIsLoading(true);
    try {
      const result = await contract.methods.login(userHash).send({ from: account });
      console.log(result);
      setLoginUsername(result.events.UserLoggedIn.returnValues.username);
      localStorage.setItem('userHash', userHash);
    } catch (error) {
      console.error("Login failed", error);
      setError('Login failed. Please check your User Hash and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-heading">Login</h2>
      <div className="login-form">
        <input
          type="text"
          value={userHash}
          onChange={(e) => setUserHash(e.target.value)}
          placeholder="User Hash"
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </div>
      {error && <p className="login-error">{error}</p>}
      {loginUsername && <p className="login-username">Username: {loginUsername}</p>}
    </div>
  );
};

export default Login;
