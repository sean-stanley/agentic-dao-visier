import { VoteData, TimelineData } from '@/app/types';
import ProposalPageWrapper from '@/app/ui/proposal/ProposalPageWrapper';

const sampleVoteData: VoteData = {
    for: { amount: '1.1m', percentage: '99.62%' },
    against: { amount: '3.7k', percentage: '0.32%' },
    abstain: { amount: '611.308', percentage: '0.05%' },
};

const sampleProposal = {
    id: 'bd77b',
    title: 'Approve the Nova Fee Sweep Action',
    status: 'ACTIVE',
    date: 'Jan 28th, 2025',
    treasury: 'Arbitrum Treasury',
    votesFor: 123456,
    votesAgainst: 78910,
    totalVotes: 202366,
    addresses: 501,
    authorAddress: '0xb4c0...6f13',
    daoName: 'In Arbitrum DAO',
    timeAgo: '1d ago',
    shortHash: '#bd77b',
    abstractText:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. ",
}

const sampleTimelineData: TimelineData = {
    created: 'Jan 31, 2025 • 8:34 AM',
    start: 'Jan 31, 2025 • 8:30 AM',
    end: 'Feb 7, 2025 • 8:30 AM',
};


export default function ProposalPage() {
  return (
    <div className="max-w-3xl mx-auto mt-8">
        <ProposalPageWrapper proposal={sampleProposal} voteData={sampleVoteData} timeline={sampleTimelineData}/>
    </div>
  );
}