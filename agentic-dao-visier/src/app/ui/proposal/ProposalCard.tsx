"use client";
// import { Proposal } from "@/app/types";
import { Proposal } from "@/app/lib/wagmi/get_proposals";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

import {
  hasExpired,
  formatUnixTimestamp,
  formatNumber,
} from "@/app/lib/wagmi/utils";

// A small pill-like component for the status
function StatusBadge({ executed }: { executed: boolean }) {
  if (executed) {
    return (
      <span
        className={
          "rounded-full px-2 py-1 text-xs font-semibold bg-green-100 text-green-600"
        }
      >
        EXECUTED
      </span>
    );
  } else {
    return (
      <span
        className={
          "rounded-full px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-600"
        }
      >
        PENDING
      </span>
    );
  }
}

export default function ProposalCard({ proposal }) {
  const {
    id,
    description,
    descriptionHash,
    expiryTimestamp,
    proposal_id,
    proposer,
    vote_yes,
    vote_no,
    ai_risk_score,
  } = proposal;

  const totalVotes = Number(vote_yes) + Number(vote_no);

  // Calculate percentages for the vote bar.
  const totalForBar = Number(vote_yes) + Number(vote_no);
  const forPercentage =
    totalForBar > 0 ? (Number(vote_yes) / totalForBar) * 100 : 0;
  const againstPercentage = totalForBar > 0 ? 100 - forPercentage : 0;

  return (
    <div className="w-full rounded-xl bg-gray-50 p-4 shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-l font-bold text-gray-800">{`Proposal #${proposal_id}`}</h3>
        <div className="flex items-center space-x-2">
          <StatusBadge executed={true} />
          <span
            className={`text-sm ${
              hasExpired(expiryTimestamp) ? "text-red-500" : "text-green-700"
            }`}
          >
            {formatUnixTimestamp(expiryTimestamp)}
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="mb-4 text-sm text-gray-600">{descriptionHash}</div>
        <div className="flex flex-row">
          <div className="mb-4 text-sm text-gray-600">{`Ai Risk Score: ${ai_risk_score}`}</div>
          <DocumentDuplicateIcon
            width={18}
            height={18}
            onClick={() => navigator.clipboard.writeText(ai_risk_score)}
          />
        </div>
      </div>

      <div className="flex flex-row justify-start mb-8 gap-4">
        <div className="flex flex-col bg-slate-100 p-6 rounded-xl w-full shadow-md">
          <h3 className="text-md font-semibold text-gray-600 mb-3">
            Description
          </h3>
          <p className="text-sm text-gray-800 leading-relaxed text-left">
            {description}
          </p>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Votes for</span>
          <span className="text-xl font-semibold text-green-600">
            {formatNumber(Number(vote_yes))}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Votes against</span>
          <span className="text-xl font-semibold text-red-600">
            {formatNumber(Number(vote_no))}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Total Votes</span>
          <span className="text-xl font-semibold text-gray-800">
            {formatNumber(totalVotes)}
          </span>
        </div>
      </div>

      {/* Visual vote bar */}
      <div className="py-2">
        <div className="relative h-2 w-full rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{ width: `${forPercentage}%` }}
          />
          <div
            className="absolute top-0 right-0 h-full bg-red-500"
            style={{ width: `${againstPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
