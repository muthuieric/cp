export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] pt-24 pb-28 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto animate-pulse">
        {/* Back Link Skeleton */}
        <div className="h-4 w-36 bg-slate-200 rounded mb-6" />

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Main Image Skeleton */}
            <div className="aspect-[16/9] bg-slate-200 rounded-xl overflow-hidden" />
            
            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[4/3] bg-slate-200 rounded-lg" />
              ))}
            </div>

            {/* Financial Terms Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-4">
              <div className="h-6 w-48 bg-slate-200 rounded" />
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="h-20 bg-slate-100 rounded-lg" />
                <div className="h-20 bg-slate-100 rounded-lg" />
                <div className="h-20 bg-slate-100 rounded-lg" />
              </div>
            </div>

            {/* Architectural Specs */}
            <div className="bg-white border border-slate-200 rounded-xl p-8 space-y-4">
              <div className="h-6 w-56 bg-slate-200 rounded" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-slate-100 rounded-lg" />
                ))}
              </div>
            </div>
          </div>

          {/* Right Sticky Panel Skeleton */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-6">
              <div className="h-28 bg-slate-900 rounded-lg" />
              <div className="h-10 bg-slate-100 rounded" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-16 bg-slate-50 rounded" />
                <div className="h-16 bg-slate-50 rounded" />
                <div className="h-16 bg-slate-50 rounded" />
                <div className="h-16 bg-slate-50 rounded" />
              </div>
              <div className="h-12 bg-[#0F766E]/40 rounded-lg" />
              <div className="h-12 bg-slate-100 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
