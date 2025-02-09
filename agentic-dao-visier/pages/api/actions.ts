"use server";
import { getBuiltGraphSDK } from "@/../.graphclient";

export const retrieveProposals = async () => {
  const sdk = getBuiltGraphSDK();
  const data = await sdk.ExampleQuery();
  return data.proposalSubmitteds;
};

export const generateReport = async () => {
  const data = await fetch("/api/proposal_report");
  return data;
};
