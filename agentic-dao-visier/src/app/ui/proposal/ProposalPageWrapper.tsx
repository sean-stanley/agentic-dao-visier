import ProposalVoteAndTimeline from "./ProposalVotePanel";
import { VoteData, TimelineData, ExtendedProposal } from "@/app/types";
import ProposalReview from "./ProposalReview";

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
      <div className="flex-1 w-full">
        <ProposalReview />
      </div>

      {/* Right Column: Votes & Timeline */}
      <div className="w-full lg:w-1/3 lg:sticky lg:top-8">
        <ProposalVoteAndTimeline voteData={voteData} timeline={timeline} />
      </div>
    </div>
  );
}
