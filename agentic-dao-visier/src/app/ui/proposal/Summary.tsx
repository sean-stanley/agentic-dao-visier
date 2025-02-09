import React from "react";

// Component for displaying each risk analysis section
const RiskAnalysisSection = ({
  title,
  children,
}: {
  title: string;
  children: string | React.JSX.Element;
}) => (
  <div className="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
    <h2 className="text-md text-gray-800">{title}</h2>
    <div className="mt-2 text-gray-70 text-sm">{children}</div>
  </div>
);

// Main component for the proposal
const Summary = () => {
  return (
    <div className="p-6 space-y-4 font-sans">
      <RiskAnalysisSection title="1️⃣ Proposal Summary">
        The proposal seeks to allocate 100,000,000 ALG to a treasury account to
        implement a 3% annual yield (APY) for stakers within the DAO. Rewards
        would be disbursed weekly to staking participants, encouraging more
        staking activity and potential voter engagement.
      </RiskAnalysisSection>

      <RiskAnalysisSection title="2️⃣ Financial Risk Analysis">
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Treasury Impact:</strong> The transfer of 100,000,000 ALG
            represents a significant portion of the circulating supply
            (approximately 10%). This could deplete treasury reserves if
            inflation or other sustaining mechanisms are not introduced.
          </li>
          <li>
            <strong>Tokenomics:</strong> While the inflation rate is currently
            0%, introducing a staking reward mechanism could effectively create
            inflationary pressure on the system.
          </li>
          <li>
            <strong>Financial Liabilities:</strong> Weekly payouts could result
            in unsustainable financial commitments if staking participation
            grows exponentially.
          </li>
        </ul>
      </RiskAnalysisSection>

      <RiskAnalysisSection title="3️⃣ Security Risk Analysis">
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Smart Contract Permissions:</strong> The proposal adds
            complexity to staking contracts, which could introduce
            vulnerabilities if poorly implemented (e.g., reward distribution
            attacks).
          </li>
          <li>
            <strong>External Contracts:</strong> No external systems are
            involved. However, there are potential risks of over-rewarding
            whales or gaming reward calculations.
          </li>
          <li>
            <strong>Governance Attack:</strong> Centralization risks increase,
            as large stakeholders (whales) could stake disproportionately to
            claim the majority of rewards, consolidating voting power.
          </li>
        </ul>
      </RiskAnalysisSection>

      <RiskAnalysisSection title="4️⃣ Governance Risk Analysis">
        <ul className="list-disc ml-6 space-y-2">
          <li>
            <strong>Proposer History:</strong> No previous proposals from this
            address, but the submitter is a staking whale with disproportionate
            influence.
          </li>
          <li>
            <strong>Conflicting Proposals:</strong> No direct conflicts;
            however, the submitter self-benefits, raising ethical concerns.
          </li>
          <li>
            <strong>Whale Influence:</strong> Large token holders could dominate
            rewards given the lack of mechanisms to limit disproportionately
            high payouts.
          </li>
          <li>
            <strong>Timeline Criticality:</strong> The proposal is not urgent
            and requires additional deliberation to refine economic models and
            address fairness.
          </li>
        </ul>
      </RiskAnalysisSection>

      <RiskAnalysisSection title="5️⃣ Final Risk Score (0-100)">
        <strong>
          Risk Score: <span className="text-red-600">82</span>
        </strong>
      </RiskAnalysisSection>

      <RiskAnalysisSection title="Supporting Points">
        <ul className="list-decimal ml-6 space-y-2">
          <li>
            The treasury allocation of 100,000,000 ALG is disproportionately
            large and risks destabilizing financial sustainability.
          </li>
          <li>
            The design lacks safeguards against centralization and
            disproportionate whale rewards.
          </li>
          <li>
            The proposal prioritizes short-term gains over long-term
            decentralization and requires clearer mechanisms to ensure balance
            and fairness.
          </li>
        </ul>
      </RiskAnalysisSection>
    </div>
  );
};

export default Summary;
