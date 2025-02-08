import { NextApiRequest, NextApiResponse } from "next";
import { DAO_CONTRACT } from "./lib/ethers";

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

async function verifyAIReview(proposalId: number, aiReviewHash: string) {
  try {
    const isValid = await DAO_CONTRACT.verify_ai_review(proposalId, aiReviewHash);
    console.log(
      isValid ? "✅ AI review is authentic!" : "❌ AI review is NOT authentic."
    );
    return isValid as boolean;
  } catch (error) {
    console.error("❌ Error verifying AI review:", error);
  }
  return false;
}
