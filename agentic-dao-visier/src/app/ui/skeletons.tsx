// Loading animation
const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-7 w-20 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} relative mb-4 h-8 w-36 overflow-hidden rounded-md bg-gray-100`}
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </>
  );
}

export function ProposalSkeleton() {
  return (
    <div className="w-full rounded-xl bg-gray-50 p-4 shadow-md animate-pulse">
      <div className="flex items-center justify-between mb-2">
        <div className="h-4 bg-gray-300 rounded w-1/4" />
        <div className="flex items-center space-x-2">
          <div className="h-6 w-6 bg-gray-300 rounded-full" />
          <div className="h-4 bg-gray-300 rounded w-1/3" />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4" />
        <div className="flex flex-row">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-4" />
          <div className="h-6 w-6 bg-gray-300 rounded-full ml-2" />
        </div>
      </div>

      <div className="flex flex-row justify-start mb-8 gap-4">
        <div className="flex flex-col bg-slate-100 p-6 rounded-xl w-full shadow-md">
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-3" />
          <div className="h-4 bg-gray-300 rounded w-full" />
        </div>
      </div>

      {/* Stats row */}
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-1" />
          <div className="h-6 bg-gray-300 rounded w-1/4" />
        </div>
        <div className="flex flex-col">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-1" />
          <div className="h-6 bg-gray-300 rounded w-1/4" />
        </div>

        <div className="flex flex-col">
          <div className="h-4 bg-gray-300 rounded w-1/2 mb-1" />
          <div className="h-6 bg-gray-300 rounded w-1/4" />
        </div>
      </div>

      {/* Visual vote bar */}
      <div className="py-2">
        <div className="relative h-2 w-full rounded-full bg-gray-200 overflow-hidden">
          <div className="h-full bg-gray-300" style={{ width: "50%" }} />
          <div
            className="absolute top-0 right-0 h-full bg-gray-300"
            style={{ width: "50%" }}
          />
        </div>
      </div>
    </div>
  );
}
