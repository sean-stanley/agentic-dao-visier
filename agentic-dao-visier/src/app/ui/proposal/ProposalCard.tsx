"use client";
// import { Proposal } from "@/app/types";
import { Proposal } from "@/app/lib/wagmi/get_proposals";
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline";

import {
    hasExpired,
    formatUnixTimestamp,
    formatNumber,
} from "@/app/lib/wagmi/utils";
import AddressAvatar from "@/app/lib/blockies/avatar";

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

export default function ProposalCard({ proposal }: { proposal: Proposal }) {
    const {
        id,
        proposer,
        descriptionHash,
        aiReviewHash,
        aiReviewScore,
        votesYes,
        votesNo,
        expiryTimestamp,
        executed,
    } = proposal;

    const totalVotes = votesYes + votesNo;

    // Calculate percentages for the vote bar.
    const totalForBar = votesYes + votesNo;
    const forPercentage = totalForBar > 0 ? (votesYes / totalForBar) * 100 : 0;
    const againstPercentage = totalForBar > 0 ? 100 - forPercentage : 0;

    return (
        <div className="w-full rounded-xl bg-gray-50 p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
                {/*example*/}
                <div className="flex flex-row">
                    <AddressAvatar
                        address={"0xA95CBBeEdf916491A4E89f7459F447E1B7b6f45E"}
                    />
                    <h3 className="text-l font-bold text-gray-800 px-2">
                        {proposer}
                    </h3>
                </div>
                <div className="flex items-center space-x-2">
                    <StatusBadge executed={executed} />
                    <span
                        className={`text-sm ${
                            hasExpired(expiryTimestamp)
                                ? "text-red-500"
                                : "text-green-700"
                        }`}
                    >
                        {formatUnixTimestamp(expiryTimestamp)}
                    </span>
                </div>
            </div>
            <div className="flex flex-row justify-between">
                <div className="mb-4 text-sm text-gray-600">
                    {descriptionHash}
                </div>
                <div className="flex flex-row">
                    <div className="mb-4 text-sm text-gray-600">{`Review Hash: ${aiReviewHash}`}</div>
                    <DocumentDuplicateIcon
                        width={18}
                        height={18}
                        onClick={() =>
                            navigator.clipboard.writeText(aiReviewHash)
                        }
                    />
                </div>
            </div>

            <div className="flex flex-row justify-start mb-8 gap-4">
                <div className="flex flex-col bg-slate-100 p-6 rounded-xl w-full shadow-md">
                    <h3 className="text-md font-semibold text-gray-600 mb-3">
                        Proposal Summary
                    </h3>
                    <p className="text-sm text-gray-800 leading-relaxed text-left">
                        Proposal to start rewarding everyone staking with a 3%
                        APY yield. This proposal will set aside 100,000,000 ALG
                        in a treasury account and reward people who are staking
                        in the DAO contract. Payouts weekly to the address that
                        sent the staked asset. So to get compounding returns
                        youll have to stake more. Staking is also voting so
                        this encourages community engagement and can increase
                        the value of our governance token.
                    </p>
                </div>
            </div>

            {/* Stats row */}
            <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Votes for</span>
                    <span className="text-xl font-semibold text-green-600">
                        {formatNumber(votesYes)}
                    </span>
                </div>
                <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Votes against</span>
                    <span className="text-xl font-semibold text-red-600">
                        {formatNumber(votesNo)}
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
