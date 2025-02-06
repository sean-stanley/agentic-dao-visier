import Link from "next/link";
import { mockProposals } from "../../mocks/mockProposals"; 
import { calculatePercentage, formatDate } from "@/app/lib/wagmi/utils";

export default function ProposalsTable() {
    return (
        <div className="mt-6 flow-root">
            <div className="inline-block min-w-full align-middle">
                <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
                    {/* Mobile view */}
                    <div className="md:hidden">
                        {mockProposals?.map((proposal) => (
                            <div
                                key={proposal.id}
                                className="mb-2 w-full rounded-md bg-white p-4"
                            >
                                <div className="flex items-center justify-between border-b pb-4">
                                    <div>
                                        <Link href={`/proposal/${proposal.id}`}>
                                            <p className="font-medium text-blue-600 hover:underline">
                                                Proposal #{proposal.id}
                                            </p>
                                        </Link>
                                        <p className="text-sm text-gray-500">
                                            Expiry:{" "}
                                            {formatDate(
                                                proposal.expiryTimestamp
                                            )}
                                        </p>
                                    </div>
                                    <span
                                        className={`badge ${
                                            proposal.executed
                                                ? "bg-green-200 text-green-700"
                                                : "bg-red-200 text-red-700"
                                        } px-2 py-1 rounded-md text-xs`}
                                    >
                                        {proposal.executed
                                            ? "Executed"
                                            : "Pending"}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between pt-4">
                                    <p className="text-xl font-medium">
                                        {calculatePercentage(
                                            proposal.votesYes,
                                            proposal.votesNo
                                        )}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Desktop view */}
                    <table className="hidden min-w-full text-gray-900 md:table">
                        <thead className="rounded-lg text-left text-sm font-normal">
                            <tr>
                                <th
                                    scope="col"
                                    className="px-4 py-5 font-medium sm:pl-6"
                                >
                                    Name
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Yes Votes (%)
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Expiry Date
                                </th>
                                <th
                                    scope="col"
                                    className="px-3 py-5 font-medium"
                                >
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {mockProposals?.map((proposal) => (
                                <tr
                                    key={proposal.id}
                                    className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                                >
                                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                                        <Link href={`/proposal/${proposal.id}`}>
                                            <p className="font-medium text-blue-600 hover:underline">
                                                Proposal #{proposal.id}
                                            </p>
                                        </Link>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {calculatePercentage(
                                            proposal.votesYes,
                                            proposal.votesNo
                                        )}{" "}
                                        Yes
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        {formatDate(proposal.expiryTimestamp)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-3">
                                        <span
                                            className={`badge ${
                                                proposal.executed
                                                    ? "bg-green-200 text-green-700"
                                                    : "bg-red-200 text-red-700"
                                            } px-2 py-1 rounded-md text-xs`}
                                        >
                                            {proposal.executed
                                                ? "Executed"
                                                : "Pending"}
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
