import type { NextApiRequest, NextApiResponse } from "next";
import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig } from "./nillion/nillion_org_config";

interface ResponseData {
  jwt_tokens: {
    node: string,
    token: string,
  }[];
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    console.log(orgConfig);
    if (req.method !== "GET") {
      res.status(405);
      return;
    }

    const org = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials
    );
    await org.init();

    // generate api tokens for all nodes in the org config
    const jwtToken = await org.generateTokensForAllNodes();
    res.status(200).json({ jwt_tokens: jwtToken });
  } catch (error) {
    console.error("❌ Failed to use SecretVaultWrapper:", error);
    res
      .status(500)
      .json({ jwt_tokens: [], error: "Could not generate API key for Nillion" });
  }
}
