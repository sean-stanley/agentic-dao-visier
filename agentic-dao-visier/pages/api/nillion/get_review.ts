import { orgConfig, REVIEW_SCHEMA_ID } from "./nillion_org_config";
import { SecretVaultWrapper } from "nillion-sv-wrappers";

export default async function getProposal(proposalId: number) {
  const reviewCollection = new SecretVaultWrapper(
    orgConfig.nodes,
    orgConfig.orgCredentials,
    REVIEW_SCHEMA_ID
  );
  await reviewCollection.init();

  const review = await reviewCollection.readFromNodes({
    proposal_id: proposalId,
  });
  return review;
}
