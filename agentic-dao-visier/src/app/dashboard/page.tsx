import CardWrapper from '@/app/ui/dashboard/cards';
import { Suspense } from 'react';
import { CardSkeleton } from '@/app/ui/skeletons';
import ProposalWrapper from '@/app/ui/proposal/ProposalWrapper';
import Image from 'next/image';
 
export default async function Page() {
  return (
    <main>
      <div className='flex justify-center p-2'>
        <Image src="/arbitrumlogo.png" alt="arbitrum logo" width={250} height={250}/>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
      </Suspense>
      </div>
      <h1 className='py-5 text-xl font-bold text-gray-800 pt-7'>Latest Proposals</h1>
      <ProposalWrapper/>
    </main>
  );
}