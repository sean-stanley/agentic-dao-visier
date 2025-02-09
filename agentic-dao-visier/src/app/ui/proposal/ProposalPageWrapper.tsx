import ProposalVoteAndTimeline from "./ProposalVotePanel";
import { VoteData, TimelineData } from "@/app/types";
import ProposalTabContainer from "./ProposalTabContainer";
import Tab from "./Tab";
import { promises as fs } from "fs";
import path from "path";

import MockTabs from "./MockTabs";

interface ProposalPageWrapperProps {
  voteData: VoteData;
  timeline: TimelineData;
}

export default async function ProposalPageWrapper({
  voteData,
  timeline,
}: ProposalPageWrapperProps) {
  const content = await fs.readFile(
    path.join(process.cwd(), "src/app/mocks/review.md"),
    "utf-8"
  );

  const parseMarkdownSections = (resp: string) => {
    const sections = resp.split("---");

    const daoInformationSection = sections[0];
    const keyHighlightsSection = sections[1];
    const summarySection = sections[2];

    return {
      daoInformation: daoInformationSection,
      keyHighlights: keyHighlightsSection,
      summary: summarySection,
    };
  };

  const { daoInformation, keyHighlights, summary } =
    parseMarkdownSections(content);

  return (
    <div className="mx-auto mt-8 flex flex-col justify-center space-y-8 px-4 lg:flex-row lg:items-start lg:space-y-0 lg:space-x-8">
      {/* Left Column: Proposal Details */}
      <div className="flex-1 w-full">
        {/* <ProposalTabContainer
          informationTab={<Tab content={daoInformation} />}
          highlightTab={<Tab content={keyHighlights} />}
          summaryTab={<Tab content={summary} />}
        /> */}
        <MockTabs />
      </div>

      {/* Right Column: Votes & Timeline */}
      <div className="w-full lg:w-1/3 lg:sticky lg:top-8">
        <ProposalVoteAndTimeline voteData={voteData} timeline={timeline} />
      </div>
    </div>
  );
}
