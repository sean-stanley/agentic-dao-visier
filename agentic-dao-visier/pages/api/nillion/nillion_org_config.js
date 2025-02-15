import dotenv from "dotenv";
dotenv.config();

export const PROPOSAL_SCHEMA_ID = "f4d58805-f58b-4388-b1ce-9793e882de2a";
export const REVIEW_SCHEMA_ID = "6dbfbb0f-2427-411a-ab90-902effe3f8e2";

export const orgConfig = {
  orgCredentials: {
    secretKey: process.env.NILLION_ORG_SECRET_KEY ?? "",
    orgDid: process.env.NILLION_ORG_DID ?? "",
  },
  // demo node config
  nodes: [
    {
      url: "https://nildb-zy8u.nillion.network",
      did: "did:nil:testnet:nillion1fnhettvcrsfu8zkd5zms4d820l0ct226c3zy8u",
    },
    {
      url: "https://nildb-rl5g.nillion.network",
      did: "did:nil:testnet:nillion14x47xx85de0rg9dqunsdxg8jh82nvkax3jrl5g",
    },
    {
      url: "https://nildb-lpjp.nillion.network",
      did: "did:nil:testnet:nillion167pglv9k7m4gj05rwj520a46tulkff332vlpjp",
    },
  ],
};
