import { getBuiltGraphSDK } from "../../.graphclient";

export default async function Home() {
  const sdk = getBuiltGraphSDK();
  const data = await sdk.ExampleQuery();
  console.log(data);

  return <div></div>;
}
