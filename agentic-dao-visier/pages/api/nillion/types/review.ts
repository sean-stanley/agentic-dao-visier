export interface Review {
  _id: string;
  proposal_id: number;
  contract: string;
  research: string;
  review: string;
  review_hash: string;
  review_score: number;
}