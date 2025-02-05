import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { ethers, keccak256 } from "ethers";
import insertReview from "./nillion/insert_review";
import { ReviewResult } from "./nillion/types/review";

type ResponseData = {
  message: string;
  research?: string;
  review?: ReviewResult
};


interface AgentData {
  id: number;
  proposal: string;
  proposer: string;
  action_target: string;
  action_payload: string;
}

interface Amount {
  amount: number;
  asset: string;
  sources?: number;
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
  // Specifies the maximum allowed duration for this function to execute (in seconds)
  maxDuration: 5*60 // 5 minutes to generate the report from LLM agents,
};

const openai = new OpenAI({
  // baseURL: "https://api.openai.com", // "https://api.deepseek.com",
  apiKey:
    process.env.DEEPSEEK_API_KEY ??
    process.env.OPENAI_API_KEY ??
    "<DeepSeek API Key>",
});

const TOOL_NAME = "ReportFormatter";
const REASONING_MODEL = "o1-preview";
const GENERAL_MODEL = "gpt-4o-2024-11-20";

const SYSTEM_PROMPT = `You are an AI governance advisor for a decentralized autonomous organization (DAO) running on Arbitrum Stylus. Your task is to analyze DAO proposals and generate a structured risk assessment. Consider potential risks, past governance trends, treasury sustainability, and voting manipulation. Provide an overall risk score from 0 to 100, where 0 is no risk and 100 is extremely high risk. Keep the response structured and include an analysis of financial, security, and governance risks. Only base your analysis on provided data—avoid speculation."

📌 Review Format:
1️⃣ Proposal Summary

Summarize the proposal in 2-3 sentences.
2️⃣ Financial Risk Analysis

Does the proposal impact DAO treasury reserves?
Does it change tokenomics (minting, burning, inflation)?
Will it introduce new financial liabilities?
3️⃣ Security Risk Analysis

Does it modify smart contract permissions or system-critical parameters?
Does it involve external contracts (cross-chain bridges, lending pools, oracles)?
Is there a risk of a governance attack (e.g., reentrancy, vote buying)?
Does the proposal action accurately reflect the description?
4️⃣ Governance Risk Analysis

Has this proposer submitted similar proposals before?
Are any currently active proposals contradicting or conflicting with this one?
Does the proposer have any conflicts of interest or might have some that are undeclared?
Are large token holders disproportionately benefiting?
Is this an urgent decision with a short timeline?
5️⃣ Final Risk Score (0-100)

Use the ${TOOL_NAME} tool to format the report.

Assign a numerical risk score (0-100). A risk greater than 75 means high risk and the propsoal should be rejected without significant refinement.

Justify the score with 2-3 supporting points.
`;

const DAO_INFO = {
  name: "Research Governance DAO",
  contractAddress: process.env.CONTRACT_ADDRESS ?? '', // this will change with future versions
  description:
    "A decentralized autonomous organization (DAO) that governs the Arbitrum Stylus network.",
  symbol: "ALG",
  totalSupply: 1000000,
  circulatingSupply: 500000,
  inflationRate: 0.05,
  delegates: 445e6
};

// Example contract data
const ABI = [
  "function mint(address to, uint256 amount)",
  "function transfer(address to, uint256 amount)",
  "function balanceOf(address owner) view returns (uint256)",
  "function stake(address to, uint256 amount)",
  "function unstake(address to, uint256 amount)",
  "function treasury() view returns (address)",
  "function update_proposal_with_ai_review(uint256 proposal_id, bytes32 ai_review_hash) public",
  "function verify_ai_review(uint256 proposal_id, bytes32 provided_hash) public view returns (bool)",
  // Add other function signatures if necessary
];

// Got this here if necessary.
// function decodeFunctionCall(encodedData: string): string {
//   // Initialize Interface with the contract ABI
//   const iface = new ethers.utils.Interface(tokenABI);

//   // Decode the data
//   try {
//     const decoded = iface.parseTransaction({ data: encodedData });

//     // Construct a human-readable string
//     const functionName = decoded.name;
//     const args = decoded.args.map((arg: any) => arg.toString()).join(", ");
//     return `${functionName}(${args})`;
//   } catch (error) {
//     console.error("Decoding Error:", error);
//     return "Invalid or unsupported encoded data.";
//   }
// }

const RESEARCHER = {
  model: GENERAL_MODEL,
  prompt: (
    submitterAddress: string,
    DAO_INFO: Record<string, string | number>,
    stakingDistributions: [string, number][],
    treasuryState: Record<string, Amount>,
    tokenomics: Record<string, number|string>,
    proposalAction: string,
    proposalTarget: string
  ) => `
    You are a research assistant to an AI governance advisor. You're job is to strip and simplify the JSON data provided into a formatted format explaining what each data point means. Be sure to highlight if there are any whales in the staking distributions and if the proposal was submitted by a whale. Your response should be structured and easy to understand for the governance advisor to have up-to-date info on the state of the DAO and network.

    **General DAO info**
    ${JSON.stringify(DAO_INFO, null, 2)}

    **Smart Contract ABI**
    ${ABI.map((sig) => `- ${sig}`).join("\n")}

    **Previous Proposals**
    [] // Not yet implemented
    

    **Staking distributions** Highlight the whales on this proposal.
    ${stakingDistributions
      .map(([address, amount]) => `Address: ${address}, Amount: ${amount}`)
      .join("\n")}

    **Treasury status** What is the current state of the treasury?
    ${JSON.stringify(treasuryState)}

    **Tokenomics** What are the overarching tokenomics of the chain and token
    ${JSON.stringify(tokenomics)}

    **Submitter** 
    Address: ${submitterAddress}

    **Proposal Action**
    ${proposalAction} on ${proposalTarget}
  `,
};

// TODO refactor to just be a server-side function triggered by an event onchain
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  try {
    const body = req.body as AgentData;
    const result = await makeReport(body);
    const id = makeReportHash(result?.review?.report ?? "");

    // ready to send report to client
    res.status(200).json(result);

    // TODO: store the review on Nillion nodes
    insertReview(result)

    // update proposal with AI review hash
    await updateProposal(body.id, id);
  } catch (error) {
    console.error(error);
    // TODO: log error to a service like Sentry or LogRocket
    // TODO: return a secure message that doesn't leak implementation details to the client
    res.status(500).json({ message: (error as Error).message });
  }
}

export function makeReportHash(report: string): string {
  return keccak256(ethers.toUtf8Bytes(report))
}

export async function updateProposal(proposalId: number, hashId: string): Promise<void> {
  const provider = new ethers.JsonRpcProvider(process.env.ARBITRUM_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY ?? '', provider);

  const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS ?? '',
    ABI,
    wallet
  );

  try {
    const tx = await contract.update_proposal_with_ai_review(
      proposalId,
      hashId
    );
    console.log("Transaction sent! Waiting for confirmation...");
    await tx.wait();
    console.log(`✅ AI review hash added! Tx Hash: ${tx.hash}`);
  } catch (error) {
    console.error("❌ Error updating proposal:", error);
  }

}


export async function makeReport(data: AgentData): Promise<ResponseData> {
  // proposal data we assume is mainly a markdown version of the pitch for the proposal
  // proposer is the address of the proposer. Though could include more info
  // target is the address of the contract the proposal is targeting. This is most relevant if the proposal would modify a target outside of the DAO
  // action is the non-encoded function call that the proposal is suggesting. A plain-text version is actually possible to analyse.
  const { proposal, proposer, action_payload: action, action_target: target } = data;
  console.log(target, action, proposer, proposal);

  // TODO: get other proposals from the DAO
  const stakingDistributions: [string, number][] = [
    ["0x6Ee1Cc0Db59e31F43c6712759C9A20123FCa1815", 100000],
  ]; // 2d array of [address, amount][]

  // TODO: this could be an array of treasury sources from published addresses across various networks.
  const treasuryStatus = {
    issued: { amount: 2.88e9, asset: "ALG" },
    staked: { amount: 1.2e9, asset: "ALG", sources: 10 },
    locked: { amount: 0.0, asset: "ALG" },
  };

  //  
  const tokenomics = {
    token: "ALG",
    totalSupply: 15.3e6,
    circulatingSupply: 6.9e6,
    inflationRate: 0,
  };

  const research_message = RESEARCHER.prompt(
    proposer,
    DAO_INFO,
    stakingDistributions,
    treasuryStatus,
    tokenomics,
    action,
    target
  );

  console.log(research_message)

  const researcherResult = await openai.chat.completions.create({
    model: RESEARCHER.model,
    messages: [
      {
        role: "system",
        content: research_message,
      },
    ],
  });

  const formattedReport = researcherResult.choices[0].message.content ?? "";

  // main report generation
  // BONUS: could split the researcher into various API tool calls to let the reasoning model choose when to lookup extra info and process in a loop until it has what it thinks is relevant info for the proposal.
  // In reality though this likely won't save much token use over just doing it all in one go and front-loading with possibly impertinent info.
  const proposalReview = await openai.chat.completions.create({
    model: GENERAL_MODEL,
    messages: [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      {
        role: "system",
        content: formattedReport,
      },
      { role: "user", content: `DAO Proposal from submitter:\n\n${proposal}` },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: TOOL_NAME,
          description: "Formats the report of the DAO governance advisor.",
          strict: true,
          parameters: {
            type: "object",
            additionalProperties: false,
            required: ["report", "score"],
            properties: {
              report: {
                type: "string",
                description: "the report formatted in markdown.",
              },
              score: {
                type: "number",
                description:
                  "a risk score between 0 and 100 where over 75 indicates the proposal is definitely too risky or too unethical to pass.",
              },
            },
          },
        },
      },
    ],
  });

  if (proposalReview.choices[0].message.tool_calls?.length === 0) {
    throw Error("Error: No tool calls were made.");
  }

  const review = JSON.parse(
    proposalReview.choices[0].message.tool_calls?.[0].function.arguments ?? "{}"
  );
  if (review.hasOwnProperty("report") && review.hasOwnProperty("score")) {
    return {
      message: "Hello from Next.js!",
      research: formattedReport,
      review,
    };
  }
  console.error(JSON.stringify(proposalReview, null, 2));
  throw new Error("Error parsing JSON report.");
}
