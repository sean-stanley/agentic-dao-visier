"use client";

import {
    CheckIcon,
    CheckCircleIcon,
    XMarkIcon,
    XCircleIcon,
    MinusIcon,
    MinusCircleIcon,
    ClockIcon,
} from "@heroicons/react/24/outline";

import { VoteData, TimelineData } from "@/app/types";

interface ProposalVoteAndTimelineProps {
    voteData: VoteData;
    timeline: TimelineData;
}

export default function ProposalVoteAndTimeline({
    voteData,
    timeline,
}: ProposalVoteAndTimelineProps) {
    return (
        <div className="w-full rounded-xl bg-gray-50 p-4 shadow-md">
            {/* Cast Your Vote */}
            <div>
                <h2 className="mb-2 text-lg font-semibold">Cast Your Vote</h2>
                <div className="flex items-center space-x-4">
                    {/* FOR button/icon */}
                    <button
                        type="button"
                        className="flex h-12 w-12 items-center justify-center 
                       rounded-full border-2 border-green-600 text-green-600 
                       hover:bg-green-100 transition-colors"
                    >
                        <CheckIcon className="h-6 w-6" />
                    </button>

                    {/* AGAINST button/icon */}
                    <button
                        type="button"
                        className="flex h-12 w-12 items-center justify-center 
                       rounded-full border-2 border-red-600 text-red-600 
                       hover:bg-red-100 transition-colors"
                    >
                        <XMarkIcon className="h-6 w-6" />
                    </button>

                    {/* ABSTAIN button/icon */}
                    <button
                        type="button"
                        className="flex h-12 w-12 items-center justify-center 
                       rounded-full border-2 border-gray-600 text-gray-600 
                       hover:bg-gray-100 transition-colors"
                    >
                        <MinusIcon className="h-6 w-6" />
                    </button>
                </div>
            </div>

            {/* Results */}
            <div className="mt-6">
                <h2 className="mb-2 text-lg font-semibold">Results</h2>
                <div className="flex flex-col space-y-2">
                    <div className="flex items-center justify-between rounded-md bg-green-100 p-2">
                        <div className="flex items-center space-x-2 text-green-700">
                            <CheckCircleIcon className="h-5 w-5" />
                            <span>For</span>
                        </div>
                        <div>
                            {voteData.for.amount} {voteData.for.percentage}
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-md bg-red-100 p-2">
                        <div className="flex items-center space-x-2 text-red-700">
                            <XCircleIcon className="h-5 w-5" />
                            <span>Against</span>
                        </div>
                        <div>
                            {voteData.against.amount}{" "}
                            {voteData.against.percentage}
                        </div>
                    </div>

                    <div className="flex items-center justify-between rounded-md bg-gray-100 p-2">
                        <div className="flex items-center space-x-2 text-gray-700">
                            <MinusCircleIcon className="h-5 w-5" />
                            <span>Abstain</span>
                        </div>
                        <div>
                            {voteData.abstain.amount}{" "}
                            {voteData.abstain.percentage}
                        </div>
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="mt-6">
                <h2 className="mb-2 flex items-center space-x-2 text-lg font-semibold">
                    <ClockIcon className="h-5 w-5" />
                    <span>Timeline</span>
                </h2>
                <div className="ml-1 flex flex-col space-y-2 text-sm text-gray-700">
                    <div>
                        <div className="font-medium">Created</div>
                        <div>{timeline.created}</div>
                    </div>
                    <div>
                        <div className="font-medium">Start</div>
                        <div>{timeline.start}</div>
                    </div>
                    <div>
                        <div className="font-medium">End</div>
                        <div>{timeline.end}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
