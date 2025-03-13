import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../context/Web3Context';
import { toast } from 'react-hot-toast';

const Staking = () => {
  const { account, vaultContract, tokenContract, tokenBalance, isStaking, stakingInfo, updateBalances } = useWeb3();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStake = async () => {
    try {
      if (!amount || !vaultContract || !tokenContract) return;
      setLoading(true);
      
      // First approve the vault contract to spend tokens
      const approveTx = await tokenContract.approve(
        vaultContract.address,
        ethers.utils.parseEther(amount)
      );
      await approveTx.wait();
      
      // Then stake the tokens
      const stakeTx = await vaultContract.stake(ethers.utils.parseEther(amount));
      await stakeTx.wait();
      
      await updateBalances(account, vaultContract, tokenContract);
      toast.success('Staking successful!');
      setAmount('');
    } catch (error) {
      console.error('Error staking:', error);
      toast.error('Failed to stake');
    } finally {
      setLoading(false);
    }
  };

  const handleUnstake = async () => {
    try {
      if (!vaultContract) return;
      setLoading(true);
      const tx = await vaultContract.unstake();
      await tx.wait();
      await updateBalances(account, vaultContract, tokenContract);
      toast.success('Unstaking successful!');
    } catch (error) {
      console.error('Error unstaking:', error);
      toast.error('Failed to unstake');
    } finally {
      setLoading(false);
    }
  };

  const calculateAPY = () => {
    return '12.5%'; // Example APY - update based on your contract's actual rate
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-black text-white p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Staking</h2>
        
        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
          <div className="mb-4">
            <p className="text-sm text-gray-300">Available to Stake</p>
            <p className="text-2xl font-bold">{tokenBalance} CVLT</p>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-300">APY</p>
            <p className="text-2xl font-bold text-green-400">{calculateAPY()}</p>
          </div>
        </div>

        {isStaking ? (
          <div className="mb-6 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Your Stake</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-300">Amount Staked</p>
                <p className="text-xl font-bold">{stakingInfo.amount} CVLT</p>
              </div>
              <div>
                <p className="text-sm text-gray-300">Rewards Earned</p>
                <p className="text-xl font-bold text-green-400">{stakingInfo.reward} CVLT</p>
              </div>
            </div>
            <button
              onClick={handleUnstake}
              disabled={loading || !account}
              className="w-full mt-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Unstake'}
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount to stake"
                className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              onClick={handleStake}
              disabled={loading || !account}
              className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Stake Tokens'}
            </button>
          </>
        )}

        {!account && (
          <p className="mt-4 text-center text-sm text-gray-400">
            Please connect your wallet to use staking
          </p>
        )}
      </div>
    </div>
  );
};

export default Staking; 