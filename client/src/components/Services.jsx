import React from "react";
import { 
  ShieldCheckIcon, 
  BanknotesIcon, 
  ChartBarIcon, 
  CurrencyDollarIcon,
  ArrowPathIcon,
  LockClosedIcon 
} from "@heroicons/react/24/outline";

const ServiceCard = ({ color, title, icon: Icon, subtitle }) => (
  <div className="flex flex-col justify-start items-center white-glassmorphism p-6 rounded-xl hover:shadow-xl">
    <div className={`w-12 h-12 rounded-full flex justify-center items-center ${color}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="ml-5 flex flex-col flex-1 items-center">
      <h3 className="mt-4 text-xl text-white font-semibold">{title}</h3>
      <p className="mt-2 text-gray-300 text-center text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
);

const Services = () => {
  const services = [
    {
      color: "bg-blue-500",
      title: "Secure Storage",
      subtitle: "Your assets are protected by industry-leading security measures and multi-signature technology.",
      icon: ShieldCheckIcon,
    },
    {
      color: "bg-green-500",
      title: "Yield Optimization",
      subtitle: "Earn maximum returns through our automated yield farming and liquidity provision strategies.",
      icon: ChartBarIcon,
    },
    {
      color: "bg-purple-500",
      title: "Asset Management",
      subtitle: "Manage your portfolio with our intuitive dashboard and real-time analytics.",
      icon: BanknotesIcon,
    },
    {
      color: "bg-red-500",
      title: "Instant Swaps",
      subtitle: "Swap between different tokens instantly with optimized routing and minimal slippage.",
      icon: ArrowPathIcon,
    },
    {
      color: "bg-yellow-500",
      title: "Staking Rewards",
      subtitle: "Stake your tokens to earn additional rewards and participate in platform governance.",
      icon: CurrencyDollarIcon,
    },
    {
      color: "bg-indigo-500",
      title: "Smart Contracts",
      subtitle: "All operations are powered by audited smart contracts on the Ethereum network.",
      icon: LockClosedIcon,
    },
  ];

  return (
    <div className="flex w-full justify-center items-center gradient-bg-services">
      <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
        <div className="flex-1 flex flex-col justify-start items-start">
          <h1 className="text-white text-3xl sm:text-5xl py-2 font-bold">
            Our Services
            <br />
            <span className="text-gradient">Designed for DeFi</span>
          </h1>
          <p className="text-left my-4 text-white font-light md:w-9/12 w-11/12 text-base">
            CryptoVault provides a comprehensive suite of DeFi services to help you maximize your crypto assets.
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-start items-center">
          <div className="grid sm:grid-cols-3 grid-cols-2 gap-4 w-full">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
