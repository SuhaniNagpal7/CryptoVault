require("@nomiclabs/hardhat-waffle");
require('dotenv').config();

module.exports = {
  solidity: "0.8.0",
  networks: {
    hardhat: {
      chainId: 1337
    },
    localhost: {
      url: "http://127.0.0.1:8545"
    }
    // Add other networks using environment variables
    // Example:
    // sepolia: {
    //   url: process.env.SEPOLIA_URL,
    //   accounts: [process.env.PRIVATE_KEY]
    // }
  }
};