"use client";
import React, { useState } from "react";
import DaoInfo from "./DaoInfo";
import KeyHighlights from "./KeyHighlights";
import Summary from "./Summary";

export default function MockTabs() {
  const [activeTab, setActiveTab] = useState("KEY HIGHLIGHTS");

  return (
    <div className="w-full rounded-xl bg-gray-50 p-4 shadow-md">
      <div className="mb-4 flex space-x-4 border-b">
        {["KEY HIGHLIGHTS", "DAO INFORMATION", "SUMMARY"].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 text-center transition-colors text-md ${
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
      {activeTab === "DAO INFORMATION" && <DaoInfo />}
      {activeTab === "KEY HIGHLIGHTS" && <KeyHighlights />}
      {activeTab === "SUMMARY" && <Summary />}
    </div>
  );
}
