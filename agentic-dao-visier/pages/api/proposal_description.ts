import type { NextApiRequest, NextApiResponse } from "next";
import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig, PROPOSAL_SCHEMA_ID } from "./nillion/nillion_org_config";
import { Proposal as NillionProposal } from "./nillion/types/proposal";

interface ResponseData {
  result: NillionProposal;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method !== "POST") {
    res.status(405);
    return;
  }

  const { proposal_hash } = req.body;

  // Create a secret vault wrapper and initialize the SecretVault collection to use
  const proposalCollection = new SecretVaultWrapper(
    orgConfig.nodes,
    orgConfig.orgCredentials,
    PROPOSAL_SCHEMA_ID
  );

  await proposalCollection.init();

  const result = await proposalCollection.readFromNodes({ proposal_hash });

  return res.status(200).json({ result })
}
