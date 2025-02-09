import dotenv from "dotenv";
import { ethers, keccak256 } from "ethers";
import { SecretVaultWrapper } from "nillion-sv-wrappers";
import { orgConfig, PROPOSAL_SCHEMA_ID } from "./nillion/nillion_org_config";
import type { NextApiRequest, NextApiResponse } from "next";
import { makeProposalRecord } from "./nillion/insert_proposal";
import { DAO_CONTRACT } from "./lib/ethers";
import { LastProposalIdDocument, LastProposalIdQuery, execute } from '../../.graphclient'

dotenv.config();

/**
 * Submits a proposal to the DAO smart contract
 * and stores the hash on Nillion
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse<{error?: string, message?: string, proposal_id?: number}>) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { title, description, target, action } = req.body;
    if (!description) {
      return res.status(400).json({ error: "Proposal text is required" });
    }

    const proposal = JSON.stringify({ title, description });
    
    // Compute Keccak256 hash of the proposal
    const descriptionHash = keccak256(ethers.toUtf8Bytes(proposal));

    console.log("Submitting proposal with hash:", descriptionHash);

    console.log("Proposal:", proposal);

    console.log("calling DAO_CONTRACT.submit_proposal");

    try {
      const tx = await DAO_CONTRACT.submitProposal(description, target, action, {
        gasLimit: 999999999,
      });
      const receipt = await tx.wait();
      console.log("Transaction receipt:", receipt);
    } catch (error) {
      console.error("Error submitting proposal:", error);
      // Check the error message and stack trace for more information
    }

    // wait 5 seconds
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Get the proposal ID from the event
    const result = await execute(LastProposalIdDocument, {});

    const proposalId = result?.data?.proposalSubmitteds?.[0]?.proposal_id;

    console.log("Last Proposal ID from GraphQL:", proposalId);

    // Fetch the hash from graph
    const storedHash = await DAO_CONTRACT.getProposalHash(proposalId);

    console.log(`Stored hash on-chain: ${storedHash}`);

    if (descriptionHash !== storedHash) {
      throw new Error("proposal hash doesn't match what was found on-chain");
    }

    // Store the hash and original in nillion collection

    // Create a secret vault wrapper and initialize the SecretVault collection to use
    const proposalCollection = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials,
      PROPOSAL_SCHEMA_ID
    );

    /// Try to store the proposal in nillion

    await proposalCollection.init();

    const proposalRecord = await makeProposalRecord(proposal, proposalId);

    // Write collection data to nodes encrypting the specified fields ahead of time
    const dataWritten = await proposalCollection.writeToNodes(
      proposalRecord
    );

    console.log(
      "👀 Data written to nodes:",
      JSON.stringify(dataWritten, null, 2)
    );
    res
      .status(201)
      .json({
        message:
          "successfully added proposal on-chain with nillion storage backup",
        proposal_id: proposalId,
      });
  } catch (err) {
    console.error(err);
    return res.status(500).json({"error": "something went wrong"})
  }
}
