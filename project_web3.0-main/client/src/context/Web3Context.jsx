import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { toast } from 'react-hot-toast';
import CryptoVaultABI from '../contracts/CryptoVault.json';
import VaultTokenABI from '../contracts/VaultToken.json';
import { CRYPTOVAULT_ADDRESS, VAULTTOKEN_ADDRESS } from '../utils/constants';

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState(null);
  const [vaultContract, setVaultContract] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [vaultBalance, setVaultBalance] = useState('0');
  const [tokenBalance, setTokenBalance] = useState('0');
  const [isStaking, setIsStaking] = useState(false);
  const [stakingInfo, setStakingInfo] = useState({
    amount: '0',
    startTime: 0,
    reward: '0'
  });

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        toast.error('Please install MetaMask!');
        return;
      }

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      setAccount(accounts[0]);
      setProvider(provider);
      
      const vault = new ethers.Contract(
        CRYPTOVAULT_ADDRESS,
        CryptoVaultABI.abi,
        signer
      );
      
      const token = new ethers.Contract(
        VAULTTOKEN_ADDRESS,
        VaultTokenABI.abi,
        signer
      );
      
      setVaultContract(vault);
      setTokenContract(token);
      
      await updateBalances(accounts[0], vault, token);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const updateBalances = async (address, vault, token) => {
    try {
      const vaultInfo = await vault.getVaultInfo(address);
      setVaultBalance(ethers.utils.formatEther(vaultInfo.balance));
      setIsStaking(vaultInfo.isStaking);
      if (vaultInfo.isStaking) {
        setStakingInfo({
          amount: ethers.utils.formatEther(vaultInfo.stakedAmount),
          startTime: vaultInfo.stakingStartTime.toNumber(),
          reward: ethers.utils.formatEther(
            await vault.calculateReward(
              vaultInfo.stakedAmount,
              Math.floor(Date.now() / 1000) - vaultInfo.stakingStartTime
            )
          )
        });
      }
      
      const balance = await token.balanceOf(address);
      setTokenBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error('Error updating balances:', error);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
        if (accounts[0] && vaultContract && tokenContract) {
          updateBalances(accounts[0], vaultContract, tokenContract);
        }
      });
    }
  }, [vaultContract, tokenContract]);

  const value = {
    account,
    provider,
    vaultContract,
    tokenContract,
    vaultBalance,
    tokenBalance,
    isStaking,
    stakingInfo,
    connectWallet,
    updateBalances
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
}; 