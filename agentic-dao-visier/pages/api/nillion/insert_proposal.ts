import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig } from "./nillion_org_config.js";
import { keccak256 } from "ethers";

const PROPOSAL_SCHEMA_ID = "f4d58805-f58b-4388-b1ce-9793e882de2a";

const [, , proposal] = process.argv;

export const makeProposalRecord = (proposal: string, proposal_id = 1) => {
  const proposalHash = keccak256(proposal);

  return [
    {
      proposal_id,
      contract: process.env.CONTRACT_ADDRESS,
      proposal_hash: proposalHash,
      proposal: { $allot: proposal }, // proposal will be encrypted to a $share
    },
  ];
};

export default async function main(proposal: string) {
  try {
    // Create a secret vault wrapper and initialize the SecretVault collection to use
    const proposalCollection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      PROPOSAL_SCHEMA_ID
    );
    await proposalCollection.init();

    // Write collection data to nodes encrypting the specified fields ahead of time
    const dataWritten = await proposalCollection.writeToNodes(
      makeProposalRecord(proposal)
    );
    console.log(
      "👀 Data written to nodes:",
      JSON.stringify(dataWritten, null, 2)
    );

    // Get the ids of the SecretVault records created
    const newIds = [
      ...new Set(dataWritten.map((item) => item.result.data.created).flat()),
    ];
    console.log("uploaded record ids:", newIds);

    // Read all collection data from the nodes, decrypting the specified fields
    const decryptedCollectionData = await proposalCollection.readFromNodes({});

    // Log first 5 records
    console.log("Most recent records", decryptedCollectionData.slice(0, 5));
  } catch (error) {
    console.error("❌ SecretVaultWrapper error:", error);
    process.exit(1);
  }
}

main(proposal);
