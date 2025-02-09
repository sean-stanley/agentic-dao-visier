import dotenv from "dotenv";
import { ethers } from "ethers";
import daoAbi from "./dao_abi.json" with { type: "json" }

dotenv.config();

// Load environment variables
const ARBITRUM_RPC_URL = process.env.ARBITRUM_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = "0x63863cdcf8fd721a4e4e7ae9f82fae20075cc2d8";
const TOKEN_CONTRACT_ADDRESS = "0x9ac4d164d8b9aca924572b08313892d5e20892fb";


// Initialize provider, wallet, and contract
export const provider = new ethers.JsonRpcProvider(ARBITRUM_RPC_URL);
export const wallet = new ethers.Wallet(PRIVATE_KEY ?? '', provider);

export const DAO_ABI = daoAbi;

export const TOKEN_ABI = [];

export const DAO_CONTRACT = new ethers.Contract(
  CONTRACT_ADDRESS ?? "",
  DAO_ABI,
  wallet
);

export const TOKEN_CONTRACT = new ethers.Contract(TOKEN_CONTRACT_ADDRESS ?? '', TOKEN_ABI, wallet);
