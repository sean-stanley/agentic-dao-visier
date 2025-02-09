import { Asset } from "../types";
import Image from 'next/image'

const assets: Asset[] = [
  {
    name: "Arbitrum",
    asset: "ARB",
    amount: 2880000,
  },
  {
    name: "Ethereum",
    asset: "ETH",
    amount: 6550,
  },
  {
    name: "USD Coin",
    asset: "USDC",
    amount: 14220,
  },
  {
    name: "Wrapped Ether",
    asset: "WETH",
    amount: 0.01,
  },
  {
    name: "USD Coin (Arb1)",
    asset: "USDC",
    amount: 0.1,
  },
];

const BalanceComponent: React.FC = () => {
  return (
    <div className="p-7">
        <div className="p-6 py-12 max-w-4xl mx-auto rounded-xl shadow-md">
      <div className="text-2xl font-bold mb-4">$18,876,710.15 USD</div>
      <div className="text-sm text-gray-500 mb-6">Total Balance</div>
      <div className="grid grid-cols-2 font-bold text-gray-700 border-b pb-2 mb-4">
        <div>Name</div>
        <div className="text-right">Balance</div>
      </div>
      <div className="space-y-4">
        {assets.map((asset, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center space-x-4">
              {asset.logo && (
                <Image
                src={asset.logo}
                alt={asset.name}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full"
              />
              )}
              <div>
                <div className="font-medium text-gray-700">{asset.name}</div>
                <div className="text-sm text-gray-500">{asset.asset}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-700">{asset.amount.toLocaleString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default BalanceComponent;
