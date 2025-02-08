import { VoteData, TimelineData } from "@/app/types";
import ProposalPageWrapper from "@/app/ui/proposal/ProposalPageWrapper";

const sampleVoteData: VoteData = {
  for: { amount: "1.1m", percentage: "99.62%" },
  against: { amount: "3.7k", percentage: "0.32%" },
  abstain: { amount: "611.308", percentage: "0.05%" },
};

const sampleTimelineData: TimelineData = {
  created: "Jan 31, 2025 • 8:34 AM",
  start: "Jan 31, 2025 • 8:30 AM",
  end: "Feb 7, 2025 • 8:30 AM",
};

export default async function ProposalPage() {
  return (
    <div className="w-full mx-auto mt-8">
      <ProposalPageWrapper
        voteData={sampleVoteData}
        timeline={sampleTimelineData}
      />
    </div>
  );
}
