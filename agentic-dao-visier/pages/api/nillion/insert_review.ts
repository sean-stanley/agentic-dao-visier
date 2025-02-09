import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig } from "./nillion_org_config.js";
import { keccak256 } from "ethers";
import { ReviewResult } from "./types/review.js";

const REVIEW_SCHEMA_ID = "6dbfbb0f-2427-411a-ab90-902effe3f8e2";

const makeProposalRecord = (review: ReviewResult) => {
  const review_hash = keccak256(review.report);

  return [
    {
      proposal_id: 1,
      contract: process.env.CONTRACT_ADDRESS,
      review_hash: review_hash,
      review: { $allot: review }, // review will be encrypted to a $share
      review_score: review.score,
    },
  ];
};

// Insert the review body in Nillion DB
export default async function insertReview(review: ReviewResult) {
  try {
    // Create a secret vault wrapper and initialize the SecretVault collection to use
    const reviewCollection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      REVIEW_SCHEMA_ID
    );
    await reviewCollection.init();

    // Write collection data to nodes encrypting the specified fields ahead of time
    const dataWritten = await reviewCollection.writeToNodes(
      makeProposalRecord(review)
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
    const decryptedCollectionData = await reviewCollection.readFromNodes({});

    // Log first 5 records
    console.log("Most recent records", decryptedCollectionData.slice(0, 5));
  } catch (error) {
    console.error("❌ SecretVaultWrapper error:", error);
    throw error;
  }
}
