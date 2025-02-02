import {
    UserGroupIcon,
    DocumentDuplicateIcon, ChatBubbleOvalLeftEllipsisIcon, BanknotesIcon
  } from '@heroicons/react/24/outline'

const iconMap = {
    delegates: UserGroupIcon,
    proposals: DocumentDuplicateIcon,
    treasury: BanknotesIcon,
    discussion: ChatBubbleOvalLeftEllipsisIcon
};

export default async function CardWrapper(){
    // const {
    //   data
    // } = await fetchDataFromSmartContractOrSubGraph()
    return (
        <>
            <Card title="Fact 1" value={30} type="delegates" />
            <Card title="Fact 2" value={30} type="proposals" />
            <Card title="Fact 3" value={30} type="treasury" />
            <Card title="Fact 4" value={30} type="discussion" />
        </>
    )
}




export function Card({
    title,
    value,
    type,
  }: {
    title: string;
    value: number | string;
    type: 'delegates' | 'proposals' | 'treasury' | 'discussion'
  }) {
    const Icon = iconMap[type];
  
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-sm">
        <div className="flex p-4">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
          <h3 className="ml-2 text-sm font-medium">{title}</h3>
        </div>
        <p
          className= "truncate rounded-xl bg-white px-4 py-8 text-center text-2xl"
        >
          {value}
        </p>
      </div>
    );
  }
  