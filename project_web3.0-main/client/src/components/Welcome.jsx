import React from "react";
import { WalletIcon, ShieldCheckIcon, BanknotesIcon } from "@heroicons/react/24/outline";
import { useWeb3 } from "../context/Web3Context";

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="p-6 bg-indigo-900/30 rounded-xl">
    <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-indigo-400" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

const Welcome = () => {
  const { account, connectWallet } = useWeb3();

  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Secure Storage",
      description: "Your assets are protected with industry-leading security measures and smart contract audits."
    },
    {
      icon: BanknotesIcon,
      title: "High Yields",
      description: "Earn competitive yields on your digital assets through our optimized DeFi strategies."
    },
    {
      icon: WalletIcon,
      title: "Easy Access",
      description: "Deposit and withdraw your assets anytime with our user-friendly interface."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Welcome to <span className="text-indigo-400">CryptoVault</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            The next generation DeFi platform for secure asset storage and yield optimization
          </p>
          {!account && (
            <button
              onClick={connectWallet}
              className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 transition-colors"
            >
              <WalletIcon className="h-5 w-5 mr-2" />
              Connect Wallet
            </button>
          )}
        </div>

        <div className="mt-20">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        {account && (
          <div className="mt-16 text-center">
            <div className="inline-block px-6 py-4 rounded-lg bg-indigo-900/50 border border-indigo-500/30">
              <p className="text-gray-300 mb-2">Connected Wallet</p>
              <p className="text-indigo-400 font-mono">
                {`${account.slice(0, 6)}...${account.slice(-4)}`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Welcome;
