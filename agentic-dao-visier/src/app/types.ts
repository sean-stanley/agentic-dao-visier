export interface TimelineData {
    created: string; // e.g. "Jan 31, 2025 • 8:34 AM"
    start: string;   // e.g. "Jan 31, 2025 • 8:30 AM"
    end: string;     // e.g. "Feb 7, 2025 • 8:30 AM"
  }
  
  export interface Proposal {
    id: string;
    title: string;
    status: string;     // e.g. 'ACTIVE', 'PENDING EXECUTION', 'EXECUTED'
    date: string;       // e.g. 'Jan 28th, 2025'
    treasury: string;   // e.g. 'Arbitrum Treasury'
    votesFor: number;
    votesAgainst: number;
    totalVotes: number;
    addresses: number;
  }
  
  export interface ExtendedProposal extends Proposal {
    authorAddress: string;   // e.g. "0xb4c0...6f13"
    daoName: string;         // e.g. "In Arbitrum DAO"
    timeAgo: string;         // e.g. "1d ago"
    abstractText: string;    // The body of the abstract
  }
  
  export interface VoteData {
    for: { amount: string; percentage: string };
    against: { amount: string; percentage: string };
    abstain: { amount: string; percentage: string };
  }