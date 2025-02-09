import { NextApiRequest, NextApiResponse } from "next";
import getReview from "./nillion/get_review";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const proposalId = req.query.id;
  console.log(proposalId);

  const review = await getReview(parseInt(proposalId as string));

  res.status(200).json({ review });
}
