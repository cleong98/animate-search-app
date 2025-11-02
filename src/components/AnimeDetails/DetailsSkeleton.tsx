export function DetailsSkeleton() {
  return (
    <div className="min-h-screen">
      <div className="relative w-full -mx-4 -mt-4 mb-8 bg-base-100">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="skeleton w-48 md:w-56 lg:w-64 aspect-[2/3] rounded-lg"></div>

            <div className="grow flex flex-col justify-end space-y-4 text-center md:text-left items-center md:items-start">
              <div className="skeleton h-10 md:h-12 w-3/4"></div>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="skeleton h-4 w-16"></div>
                ))}
              </div>

              <div className="skeleton h-4 w-2/3"></div>
              <div className="skeleton h-4 w-1/2"></div>

              <div className="flex flex-wrap items-center gap-6 justify-center md:justify-start">
                <div className="skeleton h-6 w-12"></div>
                <div className="skeleton h-4 w-16"></div>
                <div className="skeleton h-4 w-24"></div>
                <div className="skeleton h-4 w-20"></div>
              </div>

              <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                <div className="skeleton h-4 w-24"></div>
                <div className="skeleton h-4 w-16"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 pb-12 space-y-8">
        {/* Synopsis Section */}
        <div>
          <div className="skeleton h-8 w-32 mb-4"></div>
          <div className="space-y-2">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-4/5"></div>
          </div>
        </div>

        {/* Information Section */}
        <div>
          <div className="skeleton h-8 w-40 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-2">
                <div className="skeleton h-4 w-20"></div>
                <div className="skeleton h-5 w-32"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Studios Section */}
        <div>
          <div className="skeleton h-8 w-28 mb-4"></div>
          <div className="flex flex-wrap gap-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton h-5 w-24"></div>
            ))}
          </div>
        </div>

        {/* Background Section */}
        <div>
          <div className="skeleton h-8 w-36 mb-4"></div>
          <div className="space-y-2">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-3/4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
