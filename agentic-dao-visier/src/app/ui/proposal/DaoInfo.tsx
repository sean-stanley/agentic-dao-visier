import React, { useState } from "react";

// Accordion component
const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: React.JSX.Element | React.JSX.Element[];
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

// Component for displaying key-value pairs
const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div className="mb-2">
    <strong>{label}:</strong> {value}
  </div>
);

// Component for displaying lists
const ListItem = ({ items }: { items: string[] }) => (
  <ul className="ml-4 mb-2">
    {items.map((item, index) => (
      <li key={index}>{item}</li>
    ))}
  </ul>
);

// Main DAO Information component
const DaoInfo = () => {
  return (
    <div className="p-4 font-sans">
      <Accordion title="DAO Information">
        <InfoItem label="DAO Name" value="Research Governance DAO" />
        <InfoItem
          label="Contract Address"
          value="0xb8eFb605822C9141E243F9951015bEC43645fa7b"
        />
        <InfoItem
          label="Description"
          value="Research Governance DAO governs the Arbitrum Stylus network as a decentralized autonomous organization (DAO)."
        />
        <InfoItem label="Token Symbol" value="ALG" />
        <InfoItem label="Total Supply of Tokens" value="1,000,000 ALG" />
        <InfoItem label="Circulating Supply" value="500,000 ALG" />
        <InfoItem label="Inflation Rate" value="0.05%" />
        <InfoItem
          label="Delegates"
          value="445,000,000 ALG (This likely refers to cumulative delegated tokens in governance.)"
        />
      </Accordion>

      <Accordion title="Smart Contract ABI">
        <ListItem
          items={[
            "Minting tokens (`mint`)",
            "Transferring tokens (`transfer`)",
            "Checking balances (`balanceOf`)",
            "Staking and unstaking (`stake` and `unstake`)",
            "Viewing the treasury (`treasury`)",
          ]}
        />
      </Accordion>

      <Accordion title="Previous Proposals">
        <InfoItem
          label="Status"
          value="No previous proposals have been submitted via this system. This feature may be under development."
        />
      </Accordion>

      <Accordion title="Staking Distributions">
        <InfoItem
          label="Address"
          value="0x6Ee1Cc0Db59e31F43c6712759C9A20123FCa1815"
        />
        <InfoItem
          label="Staked Amount"
          value="100,000 ALG (This is a large amount of staked tokens, making this address a whale in the staking distribution.)"
        />
      </Accordion>

      <Accordion title="Treasury Status">
        <InfoItem label="Tokens Issued" value="2,880,000,000 ALG" />
        <InfoItem
          label="Tokens Staked in Treasury"
          value="1,200,000,000 ALG across 10 sources"
        />
        <InfoItem
          label="Staked Tokens Status"
          value="41.67% of issued tokens are secured in staking with no locking mechanisms currently in effect."
        />
        <InfoItem label="Locked Tokens" value="0 ALG" />
        <InfoItem
          label="Notes"
          value="The treasury itself appears liquid and heavily staked, contributing to network security."
        />
      </Accordion>

      <Accordion title="Tokenomics">
        <InfoItem label="Token Name" value="ALG" />
        <InfoItem label="Token Total Supply" value="15,300,000 ALG" />
        <InfoItem label="Circulating Supply" value="6,900,000 ALG" />
        <InfoItem
          label="Circulating Rate"
          value="Approximately 45% of the total supply"
        />
        <InfoItem
          label="Inflation Rate"
          value="0% (No new tokens are entering the system aside from staking or minting mechanisms governed through proposals.)"
        />
      </Accordion>

      <Accordion title="Proposal Submitter">
        <InfoItem
          label="Submitter Address"
          value="0x6Ee1Cc0Db59e31F43c6712759C9A20123FCa1815"
        />
        <InfoItem
          label="Note"
          value="This address also falls under the 'whale' category based on its staking activity."
        />
      </Accordion>

      <Accordion title="Proposal Action">
        <InfoItem
          label="Functionality"
          value="Transfer 100,000,000 ALG to 0x6Ee1Cc0Db59e31F43c6712759C9A20123FCa1815"
        />
        <InfoItem
          label="Target Contract Address"
          value="0xb8eFb605822C9141E243F9951015bEC43645fa7b"
        />
        <InfoItem
          label="Notes"
          value="If approved, this indicates the whale address (submitter) will receive a significant number of tokens."
        />
      </Accordion>
    </div>
  );
};

export default DaoInfo;
