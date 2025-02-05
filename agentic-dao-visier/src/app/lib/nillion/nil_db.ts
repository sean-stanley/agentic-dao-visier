import { fetch_config, PROPOSAL_SCHEMA_ID, REVIEW_SCHEMA_ID } from './config';

type NodeResponse<T> = {
    data: T;
};

export interface Proposal {
  id: string;
  proposal_id: number;
  proposal: string;
  contract: string;
  proposal_hash: string;
}

export interface Review {
    id: string;
    proposal_id: number;
    review: string;
    review_hash: string;
    contract: string;
    review_score: number;
}

class NilDBAPI {
  private config: { token: string; url: string }[];

  constructor(config: { token: string; url: string }[]) {
    this.config = config;
  }

  async getProposal(proposal_id: number): Promise<Proposal> {
    const node = this.config[0];

    try {
      const response = await fetch(`${node.url}/api/v1/data/read`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${node.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schema: PROPOSAL_SCHEMA_ID,
          filter: {
            proposal_id,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = (await response.json()) as NodeResponse<Proposal[]>;
      return result.data[0];
    } catch (error) {
      console.error(`Error reading proposal from ${node.url}:`, error);
      throw error
    }
  }

  async getReview(proposal_id: number): Promise<Review> {
    const node = this.config[0];

    try {
      const response = await fetch(`${node.url}/api/v1/data/read`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${node.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          schema: REVIEW_SCHEMA_ID,
          filter: {
            proposal_id,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = (await response.json()) as NodeResponse<Review[]>;
      return result.data[0];
    } catch (error) {
      console.error(`Error reading review from ${node.url}:`, error);
      throw error
    }
  }
}

export const createNilDBAPI = async () => {
    const config = await fetch_config();
    return new NilDBAPI(config);
};