if (!process.env.PROPOSAL_SCHEMA_ID)
  throw new Error("PROPOSAL_SCHEMA_ID is not defined");

if (!process.env.REVIEW_SCHEMA_ID)
  throw new Error("REVIEW_SCHEMA_ID is not defined");

export const fetch_config = async (): Promise<{ token: string, url: string }[]> => {
    const data = await fetch("/api/nillion_jwt").then((r) => r.json());
    return data.jwt_tokens
}

export const NUM_NODES = process.env.NUM_NODES ?? 3;

export const PROPOSAL_SCHEMA_ID = process.env.PROPOSAL_SCHEMA_ID;

export const REVIEW_SCHEMA_ID = process.env.REVIEW_SCHEMA_ID
