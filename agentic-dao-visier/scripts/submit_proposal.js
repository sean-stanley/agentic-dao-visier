import dotenv from "dotenv";
import { ethers, keccak256 } from "ethers";

dotenv.config();

const ABI = [
  "function update_proposal_with_ai_review(uint256 proposal_id, bytes32 ai_review_hash) public",
  "function verify_ai_review(uint256 proposal_id, bytes32 provided_hash) public view returns (bool)",
];

