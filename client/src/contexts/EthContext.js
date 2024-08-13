import React, { createContext, useState, useEffect } from 'react';
import Web3 from 'web3';
import UserRegistryContract from '../contracts/UserRegistry.json';

const EthContext = createContext();

const EthProvider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      // const accounts = await web3.eth.getAccounts();
      const accounts = await web3.eth.requestAccounts();
      const networkId = await web3.eth.net.getId();
      
      const deployedNetwork = UserRegistryContract.networks[networkId];
      const instance = new web3.eth.Contract(
        UserRegistryContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      setWeb3(web3);
      setAccount(accounts[0]);
      setContract(instance);

      // if (accounts[0]) {
      //   const loginStatus = await instance.methods.isLoggedIn().call({ from: accounts[0] });
      //   setIsLoggedIn(loginStatus);
      // }

      const login = () => {
        setIsLoggedIn(true);
      };
    
      const logout = () => {
        setIsLoggedIn(false);
      };
    };

    init();
  }, []);

  return (
    <EthContext.Provider value={{ web3, account, contract, isLoggedIn}}>
      {children}
    </EthContext.Provider>
  );
};

export { EthContext, EthProvider };
