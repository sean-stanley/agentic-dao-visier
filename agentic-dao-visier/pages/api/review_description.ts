import type { NextApiRequest, NextApiResponse } from "next";
import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig, REVIEW_SCHEMA_ID } from "./nillion/nillion_org_config";
import { Review as NillionReview } from "./nillion/types/review";

interface ResponseData {
  result: NillionReview;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== "POST") {
    res.status(405);
    return;
  }

  const { review_hash } = req.body;

  // Create a secret vault wrapper and initialize the SecretVault collection to use
  const collection = new SecretVaultWrapper(
    orgConfig.nodes,
    orgConfig.orgCredentials,
    REVIEW_SCHEMA_ID
  );

  await collection.init();

  const result = await collection.readFromNodes({ review_hash });

  return res.status(200).json({ result })
}
