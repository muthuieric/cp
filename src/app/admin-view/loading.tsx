export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-16 sm:pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-slate-200 rounded" />
            <div className="h-4 w-96 max-w-full bg-slate-200 rounded" />
          </div>
          <div className="h-10 w-44 bg-slate-200 rounded-lg" />
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
              <div className="flex justify-between">
                <div className="h-3 w-24 bg-slate-200 rounded" />
                <div className="w-8 h-8 bg-slate-100 rounded-lg" />
              </div>
              <div className="h-7 w-20 bg-slate-200 rounded" />
              <div className="h-3 w-32 bg-slate-100 rounded" />
            </div>
          ))}
        </div>

        {/* Table Skeleton */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-slate-100">
            <div className="h-6 w-48 bg-slate-200 rounded" />
            <div className="h-9 w-64 bg-slate-100 rounded-lg" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-slate-50 border border-slate-100 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
