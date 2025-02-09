"use client";
import Link from "next/link";
import ProposalCard from "./ProposalCard";
import { mockProposals } from "@/app/mocks/mockProposals";
import { useMutation } from "@tanstack/react-query";
import { retrieveProposals } from "@/../pages/api/actions";
import { useEffect } from "react";
import { ProposalSkeleton } from "@/app/ui/skeletons";

export default function ProposalWrapper() {
  const {
    data: proposals,
    mutate: getProposals,
    isPending,
  } = useMutation({
    mutationFn: retrieveProposals,
  });

  useEffect(() => {
    getProposals();
  }, []);

  return (
    <div className="flex flex-wrap gap-2 py-4 px-0">
      {isPending && <ProposalSkeleton />}
      {proposals?.map((proposal) => (
        <Link
          className="w-full"
          key={proposal.proposal_id}
          href={`/proposals/${proposal.proposal_id}`}
        >
          <ProposalCard proposal={proposal} />
        </Link>
      ))}
    </div>
  );
}
