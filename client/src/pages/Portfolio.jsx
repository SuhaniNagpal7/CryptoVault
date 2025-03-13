import React from 'react';
import { useWeb3 } from '../context/Web3Context';
import { ethers } from 'ethers';

const Portfolio = () => {
  const { 
    account, 
    vaultBalance, 
    tokenBalance, 
    isStaking, 
    stakingInfo 
  } = useWeb3();

  const calculateTotalValue = () => {
    // Example calculation - update based on your token's actual value
    const ethPrice = 3000; // Mock ETH price in USD
    const tokenPrice = 1; // Mock CVLT price in USD
    
    const vaultValue = parseFloat(vaultBalance) * ethPrice;
    const tokenValue = parseFloat(tokenBalance) * tokenPrice;
    const stakingValue = isStaking ? parseFloat(stakingInfo.amount) * tokenPrice : 0;
    
    return (vaultValue + tokenValue + stakingValue).toFixed(2);
  };

  const AssetCard = ({ title, amount, symbol, usdValue }) => (
    <div className="bg-gray-700 rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="flex justify-between items-center">
        <div>
          <p className="text-2xl font-bold">{amount} {symbol}</p>
          <p className="text-sm text-gray-400">${usdValue} USD</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-900 to-black text-white p-4">
      <div className="max-w-2xl w-full bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Portfolio Overview</h2>
          <p className="text-4xl font-bold text-green-400">
            ${calculateTotalValue()}
          </p>
          <p className="text-sm text-gray-400">Total Value</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-4">Assets</h3>
            <AssetCard
              title="Vault Balance"
              amount={vaultBalance}
              symbol="ETH"
              usdValue={(parseFloat(vaultBalance) * 3000).toFixed(2)} // Mock ETH price
            />
            <AssetCard
              title="Token Balance"
              amount={tokenBalance}
              symbol="CVLT"
              usdValue={parseFloat(tokenBalance).toFixed(2)} // Mock CVLT price
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Staking</h3>
            {isStaking ? (
              <div className="bg-gray-700 rounded-lg p-4">
                <div className="mb-4">
                  <p className="text-sm text-gray-300">Staked Amount</p>
                  <p className="text-2xl font-bold">{stakingInfo.amount} CVLT</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm text-gray-300">Rewards Earned</p>
                  <p className="text-2xl font-bold text-green-400">
                    {stakingInfo.reward} CVLT
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-300">Staking Since</p>
                  <p className="text-lg">
                    {new Date(stakingInfo.startTime * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-gray-700 rounded-lg p-4 text-center">
                <p className="text-gray-400">No active staking</p>
              </div>
            )}
          </div>
        </div>

        {!account && (
          <div className="text-center mt-8">
            <p className="text-gray-400">
              Please connect your wallet to view your portfolio
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Portfolio; 