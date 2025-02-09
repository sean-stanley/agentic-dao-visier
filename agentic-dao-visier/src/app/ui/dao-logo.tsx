import Image from 'next/image';


export default function SentinelLogo() {
    return (
      <div className="flex flex-row items-center leading-none text-white">
        <Image src="/sentinel.png" alt='sentinel logo' width={50} height={50}/>
        <p className="ml-2 text-3xl font-bold font-extrabold">Sentinel</p>
      </div>
    );
  }