import React, { useState } from "react";

// Accordion component for each InfoPoint
const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: React.JSX.Element | string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4 border border-gray-300 rounded-lg bg-gray-50">
      <div
        onClick={toggleAccordion}
        className="flex justify-between items-center p-4 cursor-pointer transition-all"
      >
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <span
          className={`transform transition-transform ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          ➔
        </span>
      </div>
      {isOpen && <div className="p-4 text-sm text-gray-700">{children}</div>}
    </div>
  );
};

// Main component to display all points
const KeyHighlights = () => {
  return (
    <div className="p-4 space-y-4 font-sans">
      <Accordion title="Whale in Staking Distribution">
        <>
          The address{" "}
          <code className="font-mono text-blue-600">
            0x6Ee1Cc0Db59e31F43c6712759C9A20123FCa1815
          </code>{" "}
          holds significant power, being both a major staker (100,000 ALG
          staked) and the proposal submitter. Evaluate potential centralization
          risks during decision-making.
        </>
      </Accordion>

      <Accordion title="Treasury Overview">
        The treasury shows a high volume of issued and staked tokens (41.67% are
        staked), but with no tokens locked. The treasury appears liquid and
        active.
      </Accordion>

      <Accordion title="Token Stability">
        The tokenomics seem robust, with a large total supply, reasonable
        project maturity (6.9 million token circulation), and no inflation,
        reducing token dilution risks.
      </Accordion>

      <Accordion title="Proposal Red Flag">
        The submitter is a whale proposing to transfer an exorbitant 100,000,000
        ALG to their own address. This requires scrutiny to ensure governance
        fairness.
      </Accordion>

      <Accordion title="Final Assessment">
        Make sure to assess if the DAO’s governance rules properly protect
        decentralization and equitable management moving forward.
      </Accordion>
    </div>
  );
};

export default KeyHighlights;
