const SkeletonBox = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`animate-pulse rounded-lg bg-neutral-gray-3 ${className}`}
    />
  );
};

export default function CategoriesMenuSkeleton() {
  return (
    <div className="hidden lg:flex justify-center gap-10">
      {/* Categories */}
      <div className="flex flex-col mt-15">
        {/* Row 1 */}
        <div className="grid grid-cols-4 gap-7 mb-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-32">
              <div className="flex items-center gap-2.5 mb-2">
                <SkeletonBox className="w-1.5 h-1.5 rounded-full shrink-0" />
                <SkeletonBox className="h-5 w-24" />
              </div>

              <div className="flex flex-col gap-2.5 px-4">
                <SkeletonBox className="h-5 w-24" />
                <SkeletonBox className="h-5 w-28" />
                <SkeletonBox className="h-5 w-20" />
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-4 gap-7">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-32">
              <div className="flex items-center gap-2.5 mb-2">
                <SkeletonBox className="w-1.5 h-1.5 rounded-full shrink-0" />
                <SkeletonBox className="h-5 w-24" />
              </div>

              <div className="flex flex-col gap-2.5 px-4">
                <SkeletonBox className="h-5 w-24" />
                <SkeletonBox className="h-5 w-28" />
                <SkeletonBox className="h-5 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popular Categories */}
      <div>
        <SkeletonBox className="h-5 w-40" />

        <div className="flex gap-6 mt-3 mb-12">
          <SkeletonBox className="w-65 h-96 rounded-xl" />

          <div>
            <SkeletonBox className="w-65 h-45 rounded-xl" />
            <SkeletonBox className="w-65 h-45 rounded-xl mt-6" />
          </div>
        </div>
      </div>
    </div>
  );
}