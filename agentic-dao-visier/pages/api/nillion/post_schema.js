import dotenv from "dotenv";
import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig } from "./nillion_org_config.js";
import proposal_schema from "./proposal_schema.json" with { type: "json" };
import review_schema from "./review_schema.json" with { type: "json" };

dotenv.config();

async function main() {
  try {
    const org = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials
    );
    await org.init();

    // Create a new collection schema for all nodes in the org
    const proposalSchema = await org.createSchema(
      proposal_schema,
      "Dao Governance Proposals"
    );
    const reviewSchema = await org.createSchema(
      review_schema,
      "Dao Governance Proposal Reviews"
    );
    console.log(
      "✅ New Collection Schema created for all nodes:",
      proposalSchema, reviewSchema
    );
    console.log("👀 Schema ID:", proposalSchema[0].result.data);
    console.log("👀 Schema ID:", reviewSchema[0].result.data);

  } catch (error) {
    console.error("❌ Failed to use SecretVaultWrapper:", error.message);
    process.exit(1);
  }
}

main();
