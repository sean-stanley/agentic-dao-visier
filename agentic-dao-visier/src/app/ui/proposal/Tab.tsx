import { MDXRemote } from "next-mdx-remote/rsc";
import { promises as fs } from "fs";
import path from "path";

export default async function Tab({ activeTab = "" }) {
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

  let innerText;

  switch (activeTab) {
    case "DAO INFORMATION":
      innerText = daoInformation;
      break;
    case "KEY HIGHLIGHTS":
      innerText = keyHighlights;
      break;
    case "SUMMARY":
      innerText = summary;
      break;
    default:
      innerText = null;
  }

  return (
    <div>
      <h3 className="text-lg font-bold">{activeTab}</h3>
      <div className="p-4">
        <h3 className="text-lg font-bold">{activeTab}</h3>
        <MDXRemote source={innerText} />
      </div>
    </div>
  );
}
