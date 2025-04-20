export default function Home() {
  return (
    <div>
      <header className="max-h-158 mx-5 mt-28 mb-16 lg:flex items-center lg:gap-6 lg:mr-12 lg:mt-39 lg:mb-22">
        <img
          className="hidden lg:block"
          src="/img/header-desktop-1.png"
          alt=""
        />
        <div className="text-neutral-gray-13">
          <div className="relative">
            <h1 className="font-semibold leading-7.5 text-2xl lg:font-bold lg:text-5xl lg:max-w-150 lg:leading-14.5 break-words">
              لباس هایی که{" "}
              <span className="px-0.25 py-1 bg-cognac-tint1 inline-block break-words">داستان</span> شما
              را روایت می کنند
            </h1>
            <p className="mt-2 mb-3 text-sm leading-6 lg:mb-4 lg:leading-7 lg:text-[1rem]">
              هر لباس با دقت و عشق طراحی شده تا به شما احساس زیبایی و اعتماد به
              نفس بدهد.
            </p>
            <img className="absolute -top-35 -left-8.5 -z-10 hidden lg:block" src="/img/shape5.svg" alt="" />
          </div>
          <div className="flex gap-2 items-center overflow-x-auto whitespace-nowrap no-scrollbar">
            <div className="leading-4.5 text-xs text-neutral-gray-11 px-4 py-0.5 bg-neutral-gray-2 border-1 border-neutral-gray-4 rounded-100 lg:py-2.5 lg:px-6 lg:text-sm lg:leading-5">
              کالکشن‌های متنوع
            </div>
            <div className="leading-4.5 text-xs text-neutral-gray-11 px-4 py-0.5 bg-neutral-gray-2 border-1 border-neutral-gray-4 rounded-100 lg:py-2.5 lg:px-6 lg:text-sm lg:leading-5">
              مد و فشن
            </div>
            <div className="leading-4.5 text-xs text-neutral-gray-11 px-4 py-0.5 bg-neutral-gray-2 border-1 border-neutral-gray-4 rounded-100 lg:py-2.5 lg:px-6 lg:text-sm lg:leading-5">
              استایل‌های خاص
            </div>
            <div className="leading-4.5 text-xs text-neutral-gray-11 px-4 py-0.5 bg-neutral-gray-2 border-1 border-neutral-gray-4 rounded-100 lg:py-2.5 lg:px-6 flex gap-3 lg:text-sm lg:leading-5">
              رنگ‌بندی‌های جذاب
              <div className="w-2 h-2 my-auto rounded-100 bg-[#D5AC97] lg:w-4 lg:h-4"></div>
              <div className="w-2 h-2 my-auto rounded-100 bg-[#C5AF86] lg:w-4 lg:h-4"></div>
              <div className="w-2 h-2 my-auto rounded-100 bg-[#977B71] lg:w-4 lg:h-4"></div>
              <div>...</div>
            </div>
          </div>
          <div className="flex items-center mt-6 mb-8 lg:my-4">
            <button className="ml-6.25 text-sm leading-5 rounded-lg bg-cognac-primery text-white flex justify-center items-center py-2.5 gap-2 px-8 lg:py-3.25 lg:px-6">
              مشاهده کالکشن‌ها
              <img src="/img/arrow-left2.svg" alt="" />
            </button>
            <img className="relative mb-7" src="/img/Arrow.svg" alt="" />
          </div>
          <div className="relative ">
          <img
                className="absolute w-14 h-14 -top-7 right-72 lg:right-120 lg:w-26 lg:h-26 lg:-top-13"
                src="img/header-logo.svg"
                alt=""
              />
            <div className="flex gap-3 items-center overflow-x-hidden">
              <img
                className="lg:hidden"
                src="/img/header-mobile-1.png"
                alt=""
              />
              <img
                className="lg:hidden"
                src="/img/header-mobile-2.png"
                alt=""
              />
             
              <img
                className="min-w-37.5 h-37.5 lg:hidden"
                src="/img/header-desktop-4.png"
                alt=""
              />
              <img
                className="hidden lg:block"
                src="/img/header-desktop-2.png"
                alt=""
              />
              <img
                className="hidden lg:block"
                src="/img/header-desktop-3.png"
                alt=""
              />
              <img
                className="hidden lg:block"
                src="/img/header-desktop-4.png"
                alt=""
              />
              <img
                className="hidden lg:block"
                src="/img/header-desktop-5.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
