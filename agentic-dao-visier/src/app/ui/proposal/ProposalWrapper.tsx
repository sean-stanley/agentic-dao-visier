import Link from 'next/link';
import ProposalCard from './ProposalCard';

export default async function ProposalWrapper() {
  // Dummy data to test the component
  const proposals = [
    {
      id: '1',
      title: 'Non-Constitutional: Stable Treasury Endowment Program 2.0',
      status: 'ACTIVE',
      date: 'Jan 28th, 2025',
      treasury: 'Arbitrum Treasury',
      votesFor: 1590000000,
      votesAgainst: 601600,
      totalVotes: 1710000000,
      addresses: 1781,
    },
    {
      id: '2',
      title: 'OpCo: A DAO-adjacent Entity for Strategy Execution',
      status: 'ACTIVE',
      date: 'Jan 27th, 2025',
      treasury: 'Arbitrum Treasury',
      votesFor: 884480000,
      votesAgainst: 852120000,
      totalVotes: 1760000000,
      addresses: 1825,
    },
    {
      id: '3',
      title: '[Constitutional AIP] Activate Arbitrum BoLD + Infura Nova Va...',
      status: 'PENDING',
      date: 'Jan 7th, 2025',
      treasury: 'Arbitrum Core',
      votesFor: 210660000,
      votesAgainst: 5680000,
      totalVotes: 210670000,
      addresses: 5421,
    },
    {
      id: '4',
      title: 'Treasury Management V1.2',
      status: 'EXECUTED',
      date: 'Dec 3rd, 2024',
      treasury: 'Arbitrum Treasury',
      votesFor: 159060000,
      votesAgainst: 3840000,
      totalVotes: 193440000,
      addresses: 5612,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 py-4 px-0">
    {proposals.map((proposal) => (
      <Link className="w-full" key={proposal.id} href={`/dashboard/proposals/${proposal.id}`}>
        <ProposalCard proposal={proposal} />
      </Link>
    ))}
  </div>
  );
}