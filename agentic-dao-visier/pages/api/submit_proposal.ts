import dotenv from "dotenv";
import { ethers, keccak256 } from "ethers";
import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig, PROPOSAL_SCHEMA_ID } from "./nillion/nillion_org_config";
import type { NextApiRequest, NextApiResponse } from "next";

dotenv.config();

// Load environment variables
const ARBITRUM_RPC_URL = process.env.ARBITRUM_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;


// Initialize provider, wallet, and contract
const provider = new ethers.JsonRpcProvider(ARBITRUM_RPC_URL);
const wallet = new ethers.Wallet(PRIVATE_KEY ?? '', provider);

const ABI = [
  "function submit_proposal(bytes32 description_hash, address proposer, ) public returns (uint256)",
  "function proposals(uint256) public view returns (tuple(address proposer, bytes32 description_hash, bytes32 ai_review_hash, uint8 ai_review_score, uint256 vote_yes, uint256 vote_no, uint64 expiry_timestamp, bool executed))",
];

// Create a secret vault wrapper and initialize the SecretVault collection to use
    const proposalCollection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      PROPOSAL_SCHEMA_ID
    );
    // await proposalCollection.init();

    // // Write collection data to nodes encrypting the specified fields ahead of time
    // const dataWritten = await proposalCollection.writeToNodes(
    //   makeProposalRecord(proposal)
    // );

const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet);

/**
 * Submits a proposal to the DAO smart contract
 * and stores the hash on Nillion
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { proposal, proposer } = req.body;
    if (!proposal) {
      return res.status(400).json({ error: "Proposal text is required" });
    }

    // Compute Keccak256 hash of the proposal
    const descriptionHash = keccak256(ethers.toUtf8Bytes(proposal));

    console.log("Submitting proposal with hash:", descriptionHash);

    // Submit proposal
    const tx = await contract.submit_proposal(descriptionHash);
    const receipt = await tx.wait();

    // Extract proposal ID from transaction logs
    const proposalId = receipt.logs[0].topics[1]; // Assuming the event emits proposal ID as the second topic
    console.log("✅ Proposal submitted with ID:", proposalId);

    // Fetch the proposal from the contract
    const proposalData = await contract.proposals(proposalId);
    const storedHash = proposalData.description_hash;

    console.log(`Stored hash on-chain: ${storedHash}`);
  } catch (err) {
    return res.send(500).json({"error": "something went wrong"})
  }
}
