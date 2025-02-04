'use client';

import { Proposal } from "@/app/types";

// Return background/text classes for status
function getStatusClasses(status: string) {
  switch (status) {
    case 'ACTIVE':
      return 'bg-purple-100 text-purple-600';
    case 'PENDING':
      return 'bg-blue-100 text-blue-600';
    case 'EXECUTED':
      return 'bg-green-100 text-green-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
}

// Abbreviates numbers (e.g. 18000 -> "18K", 2300000 -> "2.3M")
function formatNumber(num: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return num.toString();
}

// A small pill-like component for the status
function StatusBadge({ status }: { status: string }) {
  const classes = getStatusClasses(status);
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${classes}`}>
      {status}
    </span>
  );
}

export default function ProposalCard({ proposal }: { proposal: Proposal }) {
  const {
    title,
    status,
    date,
    treasury,
    votesFor,
    votesAgainst,
    totalVotes,
    addresses,
  } = proposal;

  // Calculate percentages for the vote bar.
  const totalForBar = votesFor + votesAgainst;
  const forPercentage =
    totalForBar > 0 ? (votesFor / totalForBar) * 100 : 0;
  const againstPercentage = totalForBar > 0 ? 100 - forPercentage : 0;

  return (
    <div className="w-full rounded-xl bg-gray-50 p-4 shadow-sm">
      {/* Header row (title + date + status) */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-l font-bold text-gray-800">{title}</h3>
        <div className="flex items-center space-x-2">
          <StatusBadge status={status} />
          <span className="text-sm text-gray-500">{date}</span>
        </div>
      </div>

      {/* Treasury / subtitle */}
      <div className="px-1 mb-4 text-sm text-gray-600">{treasury}</div>

      {/* Stats row */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Votes for</span>
          <span className="text-xl font-semibold text-green-600">
            {formatNumber(votesFor)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Votes against</span>
          <span className="text-xl font-semibold text-red-600">
            {formatNumber(votesAgainst)}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Total Votes</span>
          <span className="text-xl font-semibold text-gray-800">
            {formatNumber(totalVotes)}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-gray-500">Addresses</span>
          <span className="text-xl font-semibold text-gray-800">
            {addresses}
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