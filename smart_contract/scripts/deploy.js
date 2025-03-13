const main = async () => {
  // Deploy VaultToken
  const VaultToken = await ethers.getContractFactory("VaultToken");
  const vaultToken = await VaultToken.deploy();
  await vaultToken.deployed();
  console.log("VaultToken deployed to:", vaultToken.address);

  // Deploy CryptoVault with VaultToken address
  const CryptoVault = await ethers.getContractFactory("CryptoVault");
  const cryptoVault = await CryptoVault.deploy(vaultToken.address);
  await cryptoVault.deployed();
  console.log("CryptoVault deployed to:", cryptoVault.address);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();