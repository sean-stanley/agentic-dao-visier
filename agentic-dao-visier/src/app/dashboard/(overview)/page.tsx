import CardWrapper from '@/app/ui/dashboard/cards';
import { Suspense } from 'react';
import { CardSkeleton } from '@/app/ui/skeletons';
 
export default async function Page() {
  return (
    <main>
      <h1 className="mb-4 text-xl md:text-2xl">
        AI Overview Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Suspense fallback={<CardSkeleton />}>
          <CardWrapper />
      </Suspense>
      </div>
    </main>
  );
}