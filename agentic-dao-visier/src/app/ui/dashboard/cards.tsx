import {
    UserGroupIcon,
    DocumentDuplicateIcon, BanknotesIcon
  } from '@heroicons/react/24/outline'

const iconMap = {
    delegates: UserGroupIcon,
    proposals: DocumentDuplicateIcon,
    treasury: BanknotesIcon,
};

export default async function CardWrapper(){
    // const {
    //   data
    // } = await fetchDataFromSmartContractOrSubGraph()
    return (
        <>
            <Card title="Delegates" value={"442.56K"} type="delegates" subtitle='1.41M token holders'/>
            <Card title="Proposals" value={68} type="proposals" subtitle='There are active proposals'/>
            <Card title="Treasury" value={"$17.9M"} type="treasury" subtitle='10 treasury sources'/>
        </>
    )
}


export function Card({
    title,
    value,
    type,
    subtitle,
  }: {
    title: string;
    value: number | string;
    type: 'delegates' | 'proposals' | 'treasury',
    subtitle: string;
  }) {
    const Icon = iconMap[type];
  
    return (
      <div className="rounded-xl bg-gray-50 p-2 shadow-md ">
        <div className="flex p-5 justify-center">
          {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
          <h3 className="ml-2 text-m font-medium">{title}</h3>
        </div>
        <p
          className= "truncate rounded-xl bg-white px-3 py-6 text-center text-2xl"
        >
          {value}
        </p>
        <p className='flex justify-center p-2 text-sm'>{subtitle}</p>
      </div>
    );
  }
  