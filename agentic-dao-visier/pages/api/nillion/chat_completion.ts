import axios, { AxiosResponse } from "axios";

const BEARER_TOKEN = "Nillion2025";

const API_URL = "https://nilai-a779.nillion.network/v1/chat/completions";

export interface Message {
  role: "assistant" | "user" | "system";
  content: string;
}

const chatCompletion =  async (
  messages: Message[]
): Promise<AxiosResponse<unknown>> => {
  const data = JSON.stringify({
    model: "meta-llama/Llama-3.1-8B-Instruct",
    messages,
    temperature: 0.8,
    top_p: 0.95,
    max_tokens: 2048,
    stream: false,
    nilrag: {},
  });

  const config = {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
    data,
  };

  return axios.post(API_URL, config);
}

export default chatCompletion;
