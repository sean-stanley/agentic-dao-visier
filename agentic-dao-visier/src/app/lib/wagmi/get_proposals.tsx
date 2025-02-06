import { useState, useEffect } from "react";
import { useContractRead } from "wagmi";
import { ethers } from "ethers";
import { ABI } from "./abi";

const CONTRACT_ADDRESS = "0xb8eFb605822C9141E243F9951015bEC43645fa7b";

export interface Proposal {
  id: number;
  proposer: string;
  descriptionHash: string;
  aiReviewHash: string;
  aiReviewScore: number;
  votesYes: number;
  votesNo: number;
  expiryTimestamp: number;
  executed: boolean;
}

/**
 * Custom Hook: Fetches proposals from the DAO smart contract
 * @param {number} startIndex - Starting proposal index
 * @param {number} endIndex - Ending proposal index
 * @returns {object} { proposals, isLoading, error }
 */
export function useProposals(startIndex: number, endIndex: number) {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch total proposal count
  const { data: totalProposals } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: "proposal_count",
    watch: true, // Refresh when blockchain state changes
  });

  useEffect(() => {
    async function fetchProposals() {
      if (!totalProposals) return;
      setIsLoading(true);

      try {
        const fetchedProposals: Proposal[] = [];

        // Ensure endIndex does not exceed available proposals
        const safeEndIndex = Math.min(endIndex, Number(totalProposals) - 1);

        // TODO: maybe change this if you want them ordered newest first
        // TODO: you could also use Promise.all to request each one concurrently
        for (let i = startIndex; i <= safeEndIndex; i++) {
          const proposal = await fetchProposal(i);
          fetchedProposals.push(proposal);
        }

        setProposals(fetchedProposals);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProposals();
  }, [totalProposals, startIndex, endIndex]);

  return { proposals, isLoading, error };
}

// Helper function to fetch individual proposals
async function fetchProposal(proposalId: number): Promise<Proposal> {
  const provider = new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_ARBITRUM_RPC_URL
  );
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);

  const proposal = await contract.proposals(proposalId);
  return {
    id: proposalId,
    proposer: proposal[0],
    descriptionHash: proposal[1],
    aiReviewHash: proposal[2],
    aiReviewScore: proposal[3],
    votesYes: Number(proposal[4]),
    votesNo: Number(proposal[5]),
    expiryTimestamp: Number(proposal[6]),
    executed: proposal[7],
  };
}
