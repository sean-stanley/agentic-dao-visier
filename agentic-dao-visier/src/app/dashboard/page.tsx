import CardWrapper from '@/app/ui/dashboard/cards';
import { Suspense } from 'react';
import { CardSkeleton } from '@/app/ui/skeletons';
import ProposalWrapper from '@/app/ui/proposal/ProposalWrapper';
 
export default async function Page() {
  return (
    <main>
      <div className='flex justify-center'>
      <h1 className="mb-4 text-xl md:text-2xl">
        ArbitrumDAO Dashboard 
      </h1>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
      </Suspense>
      </div>
      <ProposalWrapper/>
    </main>
  );
}