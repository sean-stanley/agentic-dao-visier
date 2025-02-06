import Link from "next/link";
import ProposalCard from "./ProposalCard";
import { mockProposals } from "@/app/mocks/mockProposals";

export default async function ProposalWrapper() {
  return (
    <div className="flex flex-wrap gap-2 py-4 px-0">
      {mockProposals.map((proposal) => (
        <Link
          className="w-full"
          key={proposal.id}
          href={`/proposals/${proposal.id}`}
        >
          <ProposalCard proposal={proposal} />
        </Link>
      ))}
    </div>
  );
}
