const DelegatesPage: React.FC = () => {
  const proposals = [
    { name: "StableLab_historical", votes: 953, proposals: 865 },
    { name: "cryptogeorg", votes: 933, proposals: 953 },
    { name: "jolly.eth", votes: 933, proposals: 100 },
    { name: "igor998.eth", votes: 953, proposals: 100 },
    { name: "zigurat.eth", votes: 953, proposals: 100 },
    { name: "runx.eth", votes: 953, proposals: 100 },
    { name: "greatest.eth", votes: 953, proposals: 100 },
    { name: "aljain.eth", votes: 953, proposals: 100 },
  ];

  return (
    <div className="p-7">
      <div className="p-6 py-12 max-w-4xl mx-auto rounded-xl shadow-md">
        <div className="text-2xl font-bold mb-4">Delegates</div>
        <div className="flex flex-row font-bold text-gray-700 border-b pb-2 mb-4">
          <div className="basis-1/3">Name</div>
          <div className="basis-1/3 text-right">Proposals</div>
          <div className="basis-1/3 text-right">Votes</div>
        </div>
        <div className="space-y-4">
          {proposals.map((proposal, index) => (
            <div key={index} className="flex flex-row border-b pb-4">
              <div className="basis-1/3">
                <div className="font-medium text-gray-700">{proposal.name}</div>
              </div>
              <div className="basis-1/3 text-right">
                <div className="font-medium text-gray-700">
                  {proposal.proposals}
                </div>
              </div>
              <div className="basis-1/3 text-right">
                <div className="font-medium text-gray-700">
                  {proposal.votes}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DelegatesPage;
