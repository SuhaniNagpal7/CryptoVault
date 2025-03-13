import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../context/Web3Context';
import { toast } from 'react-hot-toast';

const Vault = () => {
  const { account, vaultContract, vaultBalance, updateBalances } = useWeb3();
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDeposit = async () => {
    try {
      if (!amount || !vaultContract) return;
      setLoading(true);
      const tx = await vaultContract.deposit({
        value: ethers.utils.parseEther(amount)
      });
      await tx.wait();
      await updateBalances(account, vaultContract);
      toast.success('Deposit successful!');
      setAmount('');
    } catch (error) {
      console.error('Error depositing:', error);
      toast.error('Failed to deposit');
    } finally {
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      if (!amount || !vaultContract) return;
      setLoading(true);
      const tx = await vaultContract.withdraw(ethers.utils.parseEther(amount));
      await tx.wait();
      await updateBalances(account, vaultContract);
      toast.success('Withdrawal successful!');
      setAmount('');
    } catch (error) {
      console.error('Error withdrawing:', error);
      toast.error('Failed to withdraw');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-900 to-black text-white p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">CryptoVault</h2>
        
        <div className="mb-6 p-4 bg-gray-700 rounded-lg">
          <p className="text-sm text-gray-300">Your Balance</p>
          <p className="text-2xl font-bold">{vaultBalance} ETH</p>
        </div>

        <div className="mb-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount in ETH"
            className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleDeposit}
            disabled={loading || !account}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Deposit'}
          </button>
          <button
            onClick={handleWithdraw}
            disabled={loading || !account}
            className="w-full py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Withdraw'}
          </button>
        </div>

        {!account && (
          <p className="mt-4 text-center text-sm text-gray-400">
            Please connect your wallet to use the vault
          </p>
        )}
      </div>
    </div>
  );
};

export default Vault; 