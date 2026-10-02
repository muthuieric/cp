export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-24 pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto animate-pulse">
        {/* Header Skeleton */}
        <div className="mb-10 space-y-3">
          <div className="h-4 w-32 bg-slate-200 rounded-full" />
          <div className="h-10 w-96 max-w-full bg-slate-200 rounded" />
          <div className="h-4 w-2/3 max-w-xl bg-slate-200 rounded" />
        </div>

        {/* Filter Bar Skeleton */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="h-10 bg-slate-100 rounded-lg sm:col-span-2 lg:col-span-1" />
            <div className="h-10 bg-slate-100 rounded-lg" />
            <div className="h-10 bg-slate-100 rounded-lg" />
            <div className="h-10 bg-slate-100 rounded-lg" />
            <div className="h-10 bg-slate-100 rounded-lg" />
          </div>
        </div>

        {/* Category Pills Skeleton */}
        <div className="flex flex-wrap gap-2.5 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-8 w-24 bg-slate-200 rounded-full" />
          ))}
        </div>

        {/* Property Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col"
            >
              <div className="h-56 bg-slate-200 relative" />
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="h-4 w-20 bg-slate-200 rounded" />
                    <div className="h-4 w-16 bg-slate-200 rounded" />
                  </div>
                  <div className="h-6 w-3/4 bg-slate-200 rounded" />
                  <div className="h-3 w-1/2 bg-slate-200 rounded" />
                </div>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100">
                  <div className="h-8 bg-slate-100 rounded" />
                  <div className="h-8 bg-slate-100 rounded" />
                  <div className="h-8 bg-slate-100 rounded" />
                </div>
                <div className="pt-3 border-t border-slate-100 flex justify-between items-center">
                  <div className="h-6 w-28 bg-slate-200 rounded" />
                  <div className="h-8 w-24 bg-slate-200 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
