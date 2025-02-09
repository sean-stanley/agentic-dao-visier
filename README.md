<h2 align="center">Sentinel</h2>
<p align="center">
  <img src="./sentinel.png" width="180" height="160" alt="Sentinel Logo">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/License-MIT-green.svg" alt="MIT License">
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome">
  <img src="https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat" alt="Contributions Welcome">
</p>


# Sentinel: A Super-Intelligent Auditor for DAO Voters

Sentinel helps DAO voters understand new proposals and spot potential red flags before casting their votes. 

---

## How It Works

1. **Monitoring**  
   - The system watches a DAO contract for new proposals using TheGraph’s subgraph.  

2. **Storage**  
   - Sentinel's system stores full proposals off-chain in **NilDB**.  
   - A corresponding hash is stored on-chain to ensure tamper-proof verification.

3. **Sentinel's Combined AI Agent Workflow**  
   1. **Researcher Agent** (Hosted on Nillion’s nilAI)  
      - **Retrieves** the full proposal description from Nillion nodes.  
      - **Decodes** the proposal action (e.g., target address, treasury details, tokenomics, DAO stakers).  
      - **Compiles** a clear, structured report for review.  

   2. **Reviewer Agent** (Hosted on OpenAI)  
      - **Analyzes** the report from the Researcher Agent.  
      - **Creates** a detailed review focusing on:  
        - **Financial Risks** (e.g., budget implications)  
        - **Security Risks** (e.g., vulnerabilities in execution)  
        - **Governance Risks** (e.g., centralized control concerns)

4. **Storing & Verifying Reviews**  
   - Once the review is ready, its hash is stored on-chain.  
   - Voters can verify the on-chain hash against the original report stored in NilDB.

---

## Why Use Sentinel?

- **Informed Decisions**: Voters can make informed decisions without technical knowledge of onchain tokenomic implications 
- **Security & Trust**: Off-chain and on-chain components ensure proposals and reviews are both accessible and verifiable.  
- **Scalable Governance**: By automating proposal analysis, DAOs can grow more effectively without sacrificing transparency.

## Demo

For demo purposes, the Sentinel system is connected to a DAO deployed on Arbitrum. The steps are the same for other EVM-compatible chains—just swap out the subgraph and configure NilDB accordingly.

---
## ✨ Features

- 🕵️ **DAO Proposal Risk Assessment (Rug Pull Prevention)** 
- 🛡️ **Zero-Knowledge Proposal Verification**
- 📈 **Tokenomics Analysis (Whale Watching)**
- 🔗 **Native Arbitrum & Full EVM Compatibility**
- 🔒 **Transparent and Immutable Proposal Tracking**

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/sean-stanley/agentic-dao-visier
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Fill in required API keys and blockchain connection details
```

4. Run the application:
```bash
npm start
```

### Requirements

- Node.js (version 16 or newer)
- OpenAI API Key
- Arbitrum Wallet
- Nillion Account

## 🛠 Built With

* [Next.js](https://nextjs.org/)
* [RainbowKit](https://www.rainbowkit.com/)
* [Arbitrum](https://arbitrum.io/)
* [The Graph](https://thegraph.com/)
* [Nillion](https://nillion.com/)
* [OpenAI](https://openai.com/api/)
* Deployed Subgraph: https://testnet.thegraph.com/explorer/subgraphs/FdrL5TpuiLrZ3R6o6hUagzkEM5z6oBtDDiHsoypyFH25?view=Query&chain=arbitrum-sepolia

## 👥 Contributors

- Sean Stanley
- Chris Kwon
- Nicole Ip
- Winford Lin

## 🤝 Contributions Welcome!

If you find Sentinel helpful, please consider:
- Reporting issues
- Submitting pull requests
- Improving documentation

## 📄 License

MIT License

## ⚠️ Disclaimer

Sentinel is a tool to assist DAO governance. Always conduct your own due diligence and consult with legal and financial experts before making significant decisions.
