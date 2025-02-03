'use client';

import { Proposal } from "@/app/types";

function getStatusClasses(status: string) {
  switch (status) {
    case 'ACTIVE':
      return 'bg-purple-100 text-purple-600';
    case 'PENDING EXECUTION':
      return 'bg-blue-100 text-blue-600';
    case 'EXECUTED':
      return 'bg-green-100 text-green-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
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

  return (
    <div className="w-full rounded-xl bg-gray-50 p-2 shadow-sm">
      {/* Header row (title + date + status) */}
      <div className="flex items-center justify-between p-4">
        <h3 className="text-sm font-medium">{title}</h3>
        <div className="flex items-center space-x-2">
          <StatusBadge status={status} />
          <span className="text-xs text-gray-500">{date}</span>
        </div>
      </div>

      {/* Subtitle (treasury / subheading) */}
      <div className="px-4 text-xs text-gray-600">{treasury}</div>

      {/* Stats row */}
      <div className="flex flex-wrap items-center justify-between px-4 pb-4 pt-2">
        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-500">Votes for</span>
          <span className="text-xl">{votesFor}</span>
        </div>

        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-500">Votes against</span>
          <span className="text-xl">{votesAgainst}</span>
        </div>

        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-500">Total Votes</span>
          <span className="text-xl">{totalVotes}</span>
        </div>

        <div className="flex flex-col items-start">
          <span className="text-sm text-gray-500">Addresses</span>
          <span className="text-xl">{addresses}</span>
        </div>
      </div>
    </div>
  );
}