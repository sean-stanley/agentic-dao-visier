import { ethers } from "ethers";
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  valid: boolean;
};

interface RequestBody {
  proposalId: number;
  aiReviewHash: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    res.status(405);
    return;
  }

  try {
    const { proposalId, aiReviewHash } = req.body as RequestBody;
    const valid = await verifyAIReview(proposalId, aiReviewHash);
    res.status(200).json({ valid });
  } catch (error) {
    console.error(error);
    // TODO: log error to a service like Sentry or LogRocket
    res.status(500);
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 5 * 60, // 5 minutes to generate the report from LLM agents,
};

const ABI = [
  "function update_proposal_with_ai_review(uint256 proposal_id, bytes32 ai_review_hash) public",
  "function verify_ai_review(uint256 proposal_id, bytes32 provided_hash) public view returns (bool)",
];

async function verifyAIReview(proposalId: number, aiReviewHash: string) {
  const provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? "", provider);

  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS ?? "",
    ABI,
    wallet
  );

  try {
    const isValid = await contract.verify_ai_review(proposalId, aiReviewHash);
    console.log(
      isValid ? "✅ AI review is authentic!" : "❌ AI review is NOT authentic."
    );
    return isValid as boolean;
  } catch (error) {
    console.error("❌ Error verifying AI review:", error);
  }
  return false;
}
