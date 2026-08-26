const SkeletonBox = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`animate-pulse rounded-lg bg-neutral-gray-3 ${className}`}
    />
  );
};

/* =========================
   Header Skeleton
========================= */

export function HeaderSkeleton() {
  return (
    <header className="overflow-hidden px-5 pt-8 mb-16 lg:pt-18 lg:mb-22">
      <div className="container mx-auto lg:ml-0 xl:mx-auto lg:flex justify-center items-center lg:gap-6">
        {/* Desktop image */}
        <div className="hidden lg:block min-w-120 h-160">
          <SkeletonBox className="w-full h-full rounded-lg" />
        </div>

        <div className="text-neutral-gray-13 w-full lg:max-w-150">
          {/* Title */}
          <div className="space-y-3 lg:ml-52">
            <SkeletonBox className="h-5 w-full md:h-12" />
            <SkeletonBox className="h-5 w-4/5 md:h-12 md:w-3/4" />
          </div>

          {/* Description */}
          <div className="mt-2 mb-3 space-y-2 lg:ml-52">
            <SkeletonBox className="h-4 w-full md:h-5" />
            <SkeletonBox className="h-4 w-4/5 md:h-5" />
          </div>

          {/* Badges */}
          <div className="flex gap-2 items-center overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBox
                key={i}
                className="h-6 w-24 shrink-0 rounded-full md:h-10 md:w-32"
              />
            ))}
          </div>

          {/* CTA */}
          <div className="flex items-center mt-6 mb-8 md:my-8">
            <SkeletonBox className="h-10 w-44 md:h-12 md:w-52 rounded-lg" />
            {/* <SkeletonBox className="h-16 w-10 ml-3 rounded-none" /> */}
          </div>

          {/* Bottom images */}
          <div className="relative">
            <div className="flex gap-3 items-center">
              {/* Mobile */}
              <SkeletonBox className="lg:hidden w-[40vw] max-w-[150px] aspect-square shrink-0" />
              <SkeletonBox className="lg:hidden w-[40vw] max-w-[150px] aspect-square shrink-0" />

              {/* Desktop */}
              <SkeletonBox className="hidden lg:block w-[230px] h-[312px] shrink-0" />
              <SkeletonBox className="hidden lg:block w-[230px] h-[312px] shrink-0" />
              <SkeletonBox className="hidden lg:block w-[230px] h-[312px] shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

/* =========================
   Categories Skeleton
========================= */

export function CategoriesSkeleton() {
  return (
    <section className="container mx-auto px-5 lg:px-16 mb-16">
      {/* Title */}
      <SkeletonBox className="h-5 w-36 mt-16 mb-6" />

      {/* =========================
          Mobile
      ========================= */}
      <div className="flex justify-center gap-2 lg:hidden overflow-hidden">
        {Array.from({ length: 2 }).map((_, columnIndex) => (
          <div key={columnIndex} className="flex flex-col gap-2 shrink-0">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonBox
                key={i}
                className="
                  w-[40vw]
                  max-w-[167px]
                  aspect-[167/210]
                  rounded-xl
                  shrink-0
                "
              />
            ))}
          </div>
        ))}
      </div>

      {/* =========================
          Desktop
      ========================= */}
      <div
        className="
          hidden
          lg:grid
          grid-cols-4
          grid-rows-6
          gap-5
          h-[760px]
          xl:h-[800px]
        "
      >
        {/* Large - Left Top */}
        <SkeletonBox
          className="
            col-span-2
            row-span-3
            rounded-xl
            w-full
            h-full
          "
        />

        {/* Small - Top Middle */}
        <SkeletonBox
          className="
            col-span-1
            row-span-2
            rounded-xl
            w-full
            h-full
          "
        />

        {/* Tall - Right */}
        <SkeletonBox
          className="
            col-span-1
            row-span-4
            rounded-xl
            w-full
            h-full
          "
        />

        {/* Tall - Left Middle */}
        <SkeletonBox
          className="
            col-span-1
            row-span-4
            rounded-xl
            w-full
            h-full
          "
        />

        {/* Large - Center Bottom */}
        <SkeletonBox
          className="
            col-span-2
            row-span-3
            rounded-xl
            w-full
            h-full
          "
        />

        {/* Small - Bottom */}
        <SkeletonBox
          className="
            col-span-1
            row-span-2
            rounded-xl
            w-full
            h-full
          "
        />
      </div>
    </section>
  );
}

/* =========================
   Customization Skeleton
========================= */

export function CustomizationSkeleton() {
  return (
    <section className="bg-neutral-gray-1 py-8 lg:py-16 overflow-hidden">
      {/* Title */}
      <div className="flex flex-col items-center gap-2 mb-2 lg:mb-4">
        <SkeletonBox className="h-6 w-72 lg:h-10 lg:w-[520px]" />
        <SkeletonBox className="h-6 w-52 lg:h-10 lg:w-[380px]" />
      </div>

      {/* Description */}
      <div className="mx-5 lg:mx-40.5 mb-6 lg:mb-10 space-y-2">
        <SkeletonBox className="h-4 w-full lg:h-5" />
        <SkeletonBox className="h-4 w-11/12 lg:h-5" />
        <SkeletonBox className="h-4 w-4/5 lg:h-5" />
      </div>

      {/* Images */}
      <div className="flex justify-center items-center gap-3 mt-8 lg:mt-16 lg:gap-6">
        {/* Mobile */}
        <SkeletonBox className="lg:hidden w-[115px] h-[160px]" />
        <SkeletonBox className="lg:hidden w-[167px] h-[240px]" />
        <SkeletonBox className="lg:hidden w-[115px] h-[160px]" />

        {/* Desktop */}
        <SkeletonBox className="hidden lg:block w-[300px] h-[244px]" />
        <SkeletonBox className="hidden lg:block w-[250px] h-[348px]" />
        <SkeletonBox className="hidden lg:block w-[374px] h-[520px]" />
        <SkeletonBox className="hidden lg:block w-[250px] h-[348px]" />
        <SkeletonBox className="hidden lg:block w-[300px] h-[244px]" />
      </div>
    </section>
  );
}

/* =========================
   Discounted Products Skeleton
========================= */

export function DiscountedProductsSkeleton() {
  return (
    <section className="container mx-auto mt-17 mb-16 lg:mt-22">
      {/* Header */}
      <div className="mx-5 mb-6 lg:mx-12 lg:mb-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SkeletonBox className="w-4 h-4 lg:w-8 lg:h-8 rounded-full" />
          <SkeletonBox className="h-5 w-40 lg:h-9 lg:w-60" />
        </div>

        <div className="flex gap-2">
          <SkeletonBox className="w-10 h-10 rounded-lg" />
          <SkeletonBox className="w-10 h-10 rounded-lg" />
        </div>
      </div>

      {/* Products */}
      <div className="flex justify-center gap-4 lg:gap-10 overflow-hidden px-5 lg:px-12">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="
              shrink-0
              w-[calc((100vw-60px)/2)]
              sm:w-[calc((100vw-60px)/2.5)]
              md:w-[calc((100vw-84px)/3)]
              lg:w-[calc((100vw-132px)/4)]
              xl:w-[300px]
            "
          >
            <SkeletonBox className="w-full aspect-[3/4] rounded-xl" />

            <SkeletonBox className="mt-3 h-4 w-4/5" />
            <SkeletonBox className="mt-2 h-4 w-1/2" />

            <div className="flex justify-between mt-3">
              <SkeletonBox className="h-5 w-20" />
              <SkeletonBox className="h-5 w-16" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* =========================
   Key Features Skeleton
========================= */

export function KeyFeaturesSkeleton() {
  return (
    <section className="bg-neutral-gray-1 px-5 py-8 lg:px-12 lg:py-14">
      <div className="container mx-auto lg:flex lg:justify-center lg:gap-11.5">
        <div className="w-full">
          {/* Heading */}
          <div className="flex flex-col items-center lg:items-start gap-2">
            <SkeletonBox className="h-6 w-64 lg:h-9 lg:w-96" />
            <SkeletonBox className="h-6 w-44 lg:h-9 lg:w-56" />
          </div>

          {/* Description */}
          <div className="mt-2 mb-6 lg:mt-4 lg:mb-12 space-y-2">
            <SkeletonBox className="h-4 w-full lg:h-5" />
            <SkeletonBox className="h-4 w-11/12 lg:h-5" />
            <SkeletonBox className="h-4 w-4/5 lg:h-5" />
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-4 justify-center lg:gap-6 lg:max-w-184 lg:grid lg:grid-cols-[auto_auto]">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="max-w-42 lg:max-w-86">
                <SkeletonBox className="w-14 h-14 rounded-xl" />

                <SkeletonBox className="mt-4 mb-2 h-4 w-32 lg:mt-6 lg:mb-4 lg:h-5 lg:w-44" />

                <div className="space-y-2">
                  <SkeletonBox className="h-3 w-full lg:h-4" />
                  <SkeletonBox className="h-3 w-11/12 lg:h-4" />
                  <SkeletonBox className="h-3 w-3/4 lg:h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About images */}
        <div className="flex gap-4 mt-6 max-w-87.5 lg:max-w-max mx-auto lg:flex-row-reverse">
          {/* Mobile */}
          <SkeletonBox className="lg:hidden w-[200px] h-[226px]" />

          {/* Desktop */}
          <SkeletonBox className="hidden lg:block mt-29.5 w-68.5 h-128.5" />

          <div className="lg:w-68.5">
            <SkeletonBox className="hidden lg:block w-68.5 h-62 mb-4" />
            <SkeletonBox className="hidden lg:block w-68.5 h-62" />

            <SkeletonBox className="lg:hidden w-[150px] h-[105px] mb-4" />
            <SkeletonBox className="lg:hidden w-[150px] h-[105px]" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================
   Articles Skeleton
========================= */

export function ArticlesSkeleton() {
  return (
    <section className="bg-neutral-gray-1 py-8 pr-5 lg:px-12 lg:py-16">
      <div className="container mx-auto">
        {/* Heading */}
        <div className="flex justify-between items-center pl-5">
          <SkeletonBox className="h-5 w-56 lg:h-9 lg:w-80" />
        </div>

        {/* Articles */}
        <div className="flex gap-3 lg:gap-6 overflow-hidden mt-6 lg:mt-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <article
              key={i}
              className="
                shrink-0
                w-[calc(100vw-80px)]
                sm:w-[calc((100vw-72px)/2)]
                lg:w-[calc((100vw-120px)/3)]
                xl:w-[432px]
              "
            >
              <SkeletonBox className="w-full aspect-[432/220] rounded-tr-2xl rounded-tl-2xl" />

              <div className="mr-2 lg:mr-4">
                <SkeletonBox className="mt-3 lg:mt-5 h-4 w-4/5 lg:h-6" />

                <div className="mt-2 space-y-2">
                  <SkeletonBox className="h-3 w-full lg:h-4" />
                  <SkeletonBox className="h-3 w-3/4 lg:h-4" />
                </div>

                <SkeletonBox className="mt-2 mb-2 h-3 w-32 lg:h-4" />

                <div className="flex gap-2">
                  <SkeletonBox className="h-5 w-16 rounded-full" />
                  <SkeletonBox className="h-5 w-20 rounded-full" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================
   Full Home Skeleton
========================= */

export default function HomeSkeleton() {
  return (
    <>
      <HeaderSkeleton />
      <CategoriesSkeleton />
      <CustomizationSkeleton />
      <DiscountedProductsSkeleton />
      <KeyFeaturesSkeleton />
      <ArticlesSkeleton />
    </>
  );
}
