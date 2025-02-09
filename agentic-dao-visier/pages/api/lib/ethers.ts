import dotenv from "dotenv";
import { ethers } from "ethers";
import daoAbi from "./dao_abi.json" with { type: "json" }

dotenv.config();

// Load environment variables
const ARBITRUM_RPC_URL = process.env.ARBITRUM_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const TOKEN_CONTRACT_ADDRESS = process.env.TOKEN_CONTRACT_ADDRESS;


// Initialize provider, wallet, and contract
export const provider = new ethers.JsonRpcProvider(ARBITRUM_RPC_URL);
export const wallet = new ethers.Wallet(PRIVATE_KEY ?? '', provider);

export const DAO_ABI = daoAbi;

export const TOKEN_ABI = [];

export const DAO_CONTRACT = new ethers.Contract(
  CONTRACT_ADDRESS ?? "0xd374f50fe0464a0b2af06b373c048a6e907045b2",
  DAO_ABI,
  wallet
);

export const TOKEN_CONTRACT = new ethers.Contract(TOKEN_CONTRACT_ADDRESS ?? '', TOKEN_ABI, wallet);
