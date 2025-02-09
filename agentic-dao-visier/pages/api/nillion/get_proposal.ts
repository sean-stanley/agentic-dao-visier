import { orgConfig, PROPOSAL_SCHEMA_ID } from "./nillion_org_config";
import { SecretVaultWrapper } from "nillion-sv-wrappers";

export default async function getProposal(proposalId: number) {
  const proposalCollection = new SecretVaultWrapper(
    orgConfig.nodes,
    orgConfig.orgCredentials,
    PROPOSAL_SCHEMA_ID
  );
  await proposalCollection.init();

  const proposal = await proposalCollection.readFromNodes({
    proposal_id: proposalId,
  });
  return proposal;
}
