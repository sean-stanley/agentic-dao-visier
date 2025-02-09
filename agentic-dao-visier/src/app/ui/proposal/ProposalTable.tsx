"use client";
import Link from "next/link";
import { calculatePercentage, formatDate } from "@/app/lib/wagmi/utils";
import { useMutation } from "@tanstack/react-query";
import { retrieveProposals } from "@/../pages/api/actions";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";

export default function ProposalsTable() {
  const {
    data: proposals,
    mutate: getProposals,
    isPending,
  } = useMutation({
    mutationFn: retrieveProposals,
  });

  return (
    <div className="mt-6 flow-root">
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={() => getProposals()}
          disabled={isPending}
          className="flex items-center  px-4 py-2 text-white bg-blue-300 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          <ArrowPathRoundedSquareIcon className="w-5 h-5 mr-2" />
          Retrieve More Proposals
        </button>
      </div>
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          {/* Desktop view */}
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Yes Votes (%)
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Expiry Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium text-center">
                  Ai Risk Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {proposals?.map((proposal) => (
                <tr
                  key={proposal.proposal_id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <Link href={`/proposals/${proposal.proposal_id}`}>
                      <p className="font-medium text-blue-600 hover:underline">
                        Proposal #{proposal.proposal_id}
                      </p>
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {calculatePercentage(
                      Number(proposal.vote_yes),
                      Number(proposal.vote_no)
                    )}{" "}
                    Yes
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDate(proposal.expiryTimestamp)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3 text-center">
                    <span
                      className={`badge ${
                        proposal.ai_risk_score >= 75
                          ? "bg-green-200 text-green-700"
                          : proposal.ai_risk_score >= 60
                          ? "bg-yellow-200 text-yellow-700"
                          : "bg-red-200 text-red-700"
                      } px-2 py-1 rounded-md text-xs`}
                    >
                      {proposal.ai_risk_score}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
