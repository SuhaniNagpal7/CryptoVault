import CryptoVaultABI from "../contracts/CryptoVault.json";
import VaultTokenABI from "../contracts/VaultToken.json";

export const CRYPTOVAULT_ADDRESS = import.meta.env.VITE_VAULT_CONTRACT_ADDRESS;
export const VAULTTOKEN_ADDRESS = import.meta.env.VITE_TOKEN_CONTRACT_ADDRESS;

export const CRYPTOVAULT_ABI = CryptoVaultABI.abi;
export const VAULTTOKEN_ABI = VaultTokenABI.abi;
