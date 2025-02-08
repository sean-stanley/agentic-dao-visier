import { MDXRemote } from "next-mdx-remote/rsc";
import { promises as fs } from "fs";
import path from "path";

export default async function ProposalReview() {
  const content = await fs.readFile(
    path.join(process.cwd(), "src/app/mocks/review.md"),
    "utf-8"
  );

  const parseMarkdownSections = (resp) => {
    const daoInformationSection = resp.split("**Smart Contract ABI**")[0];
    const keyHighlightsSection = resp
      .split("### Key Highlights for Governance Advisor:")[1]
      .split("**1️⃣ Proposal Summary**")[0];
    const summarySection = resp.split("**1️⃣ Proposal Summary**")[1];

    return {
      daoInformation: daoInformationSection,
      keyHighlights: keyHighlightsSection,
      summary: summarySection,
    };
  };

  const { daoInformation, keyHighlights, summary } =
    parseMarkdownSections(content);

  return (
    <div className="w-full rounded-xl bg-gray-50 p-4 shadow-md">
      <MDXRemote source={daoInformation} />
      <MDXRemote source={keyHighlights} />
      <MDXRemote source={summary} />
    </div>
  );
}
