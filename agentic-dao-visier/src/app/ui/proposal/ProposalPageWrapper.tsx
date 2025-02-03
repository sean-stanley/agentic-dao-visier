'use client';

import ProposalDetails from './ProposalDetails';
import ProposalVoteAndTimeline from './ProposalVotePanel';
import { VoteData, TimelineData, ExtendedProposal } from '@/app/types';


interface ProposalPageWrapperProps {
  proposal: ExtendedProposal;
  voteData: VoteData;
  timeline: TimelineData;
}

export default function ProposalPageWrapper({
  proposal,
  voteData,
  timeline,
}: ProposalPageWrapperProps) {
  return (
    <div className="mx-auto mt-8 flex flex-col justify-center space-y-8 px-4 lg:flex-row lg:items-start lg:space-y-0 lg:space-x-8">
      {/* Left Column: Proposal Details */}
      <div className="flex-1">
        <ProposalDetails proposal={proposal} />
      </div>

      {/* Right Column: Votes & Timeline */}
      <div className="w-full lg:w-1/3">
        <ProposalVoteAndTimeline voteData={voteData} timeline={timeline} />
      </div>
    </div>
  );
}