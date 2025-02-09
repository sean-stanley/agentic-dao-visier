import { NextApiRequest, NextApiResponse } from "next";
import getProposal from "./nillion/get_proposal";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const proposalId = req.query.id;
  console.log(proposalId);

  const proposal = await getProposal(parseInt(proposalId as string));

  res.status(200).json({ proposal });
}
