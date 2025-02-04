'use client';

import { Proposal } from "@/app/types";

interface ExtendedProposal extends Proposal {
  authorAddress: string;   // e.g. "0xb4c0...6f13"
  daoName: string;         // e.g. "In Arbitrum DAO"
  timeAgo: string;         // e.g. "1d ago"
  abstractText: string;    // The body of the abstract
}

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

function StatusBadge({ status }: { status: string }) {
  const classes = getStatusClasses(status);
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${classes}`}>
      {status}
    </span>
  );
}

export default function ProposalDetails({ proposal }: { proposal: ExtendedProposal }) {
  const {
    title,
    status,
    authorAddress,
    daoName,
    timeAgo,
    abstractText,
  } = proposal;

  return (
    <div className="w-full rounded-xl bg-gray-50 p-4 shadow-sm">
      {/* Title + Status */}
      <div className="flex items-start justify-between">
        <h1 className="text-xl font-semibold">{title}</h1>
        <StatusBadge status={status} />
      </div>

      {/* Author/DAO info row */}
      <div className="mt-2 flex flex-wrap items-center text-sm text-gray-600 space-x-2">
        <span>{authorAddress}</span>
        <span>{daoName}</span>
        <span>{timeAgo}</span>
      </div>

      {/* Abstract heading + content */}
      <h2 className="mt-6 text-base font-semibold">Abstract</h2>
      <p className="mt-2 text-sm text-gray-700">
        {abstractText}
      </p>
    </div>
  );
}