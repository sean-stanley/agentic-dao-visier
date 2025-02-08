"use client";
import React, { useState } from "react";

export default function ProposalTabContainer({
  informationTab,
  highlightTab,
  summaryTab,
}: {
  informationTab: React.ReactElement;
  highlightTab: React.ReactElement;
  summaryTab: React.ReactElement;
}) {
  const [activeTab, setActiveTab] = useState("DAO INFORMATION");

  return (
    <div className="w-full rounded-xl bg-gray-50 p-4 shadow-md">
      <div className="mb-4 flex space-x-4 border-b">
        {["DAO INFORMATION", "KEY HIGHLIGHTS", "SUMMARY"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 text-center font-bold transition-colors ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {activeTab === "DAO INFORMATION" && informationTab}
      {activeTab === "KEY HIGHLIGHTS" && highlightTab}
      {activeTab === "SUMMARY" && summaryTab}
    </div>
  );
}
