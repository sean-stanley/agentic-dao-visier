

export const ABI = [
  "function proposals(uint256) public view returns (tuple(address proposer, bytes32 description_hash, bytes32 ai_review_hash, uint256 vote_yes, uint256 vote_no, bool executed))",
  "function proposal_count() public view returns (uint256)",
];