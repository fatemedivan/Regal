export default function Home() {
  return (
    <div>
      <header className="mx-5 mt-8 mb-16 lg:flex lg:gap-6 lg:mr-12 lg:mt-19 lg:mb-22">
        <img
          className="hidden lg:block"
          src="/img/header-desktop-1.png"
          alt=""
        />
        <div className="text-neutral-gray13">
          <div className="relative">
            <h1 className="font-semibold leading-7.5 text-2xl lg:font-bold lg:text-5xl lg:leading14.5 lg:mb-2 lg:text-wrap">
              لباس‌هایی که{" "}
              <span className="px-1 py-1.5 bg-cognac-tint1">داستان </span>شما را
              روایت می‌کنند{" "}
            </h1>
            <p className="mt-2 mb-3 text-sm leading-6 lg:mb-4 lg:leading-7 lg:text-[1rem]">
              هر لباس با دقت و عشق طراحی شده تا به شما احساس زیبایی و اعتماد به
              نفس بدهد.
            </p>
          </div>
          <div className="flex gap-2 items-center overflow-x-auto whitespace-nowrap no-scrollbar">
            <div className="leading-4.5 text-xs text-neutral-gray11 px-4 py-0.5 bg-neutral-gray2 border-1 border-neutral-gray4 rounded-100 lg:py-2.5 lg:px-6 lg:text-sm lg:leading-5">
              کالکشن‌های متنوع
            </div>
            <div className="leading-4.5 text-xs text-neutral-gray11 px-4 py-0.5 bg-neutral-gray2 border-1 border-neutral-gray4 rounded-100 lg:py-2.5 lg:px-6 lg:text-sm lg:leading-5">
              مد و فشن
            </div>
            <div className="leading-4.5 text-xs text-neutral-gray11 px-4 py-0.5 bg-neutral-gray2 border-1 border-neutral-gray4 rounded-100 lg:py-2.5 lg:px-6 lg:text-sm lg:leading-5">
              استایل‌های خاص
            </div>
            <div className="leading-4.5 text-xs text-neutral-gray11 px-4 py-0.5 bg-neutral-gray2 border-1 border-neutral-gray4 rounded-100 lg:py-2.5 lg:px-6 flex gap-3 lg:text-sm lg:leading-5">
              رنگ‌بندی‌های جذاب
              <div className="w-4 h-4 rounded-100 bg-[#D5AC97]"></div>
              <div className="w-4 h-4 rounded-100 bg-[#C5AF86]"></div>
              <div className="w-4 h-4 rounded-100 bg-[#977B71]"></div>
              <div>...</div>
            </div>
          </div>
          <div className="flex items-center mt-6 mb-8 lg:my-8">
            <button className="ml-6.25 text-sm leading-5 rounded-lg bg-cognac-primery text-white flex justify-center items-center py-2.5 gap-2 px-15 lg:py-3.25 lg:px-6">
              مشاهده کالکشن‌ها
              <img src="/img/arrow-left2.svg" alt="" />
            </button>
            <img className="relative mb-7" src="img/Arrow.svg" alt="" />
          </div>
          <div className="flex gap-3 items-center overflow-x-auto relative no-scrollbar overflow-y-visible">
            <img className="lg:hidden" src="/img/header-mobile-1.png" alt="" />
            <img className="lg:hidden" src="/img/header-mobile-2.png" alt="" />
            <img
              className="absolute max-w-14 h-14 -top-7 right-72 "
              src="img/header-logo.svg"
              alt=""
            />
            <img
              className="min-w-37.5 h-37.5 lg:hidden"
              src="/img/header-desktop-4.png"
              alt=""
            />
            <img className="hidden lg:block" src="/img/header-desktop-2" alt="" />
            <img className="hidden lg:block" src="/img/header-desktop-3" alt="" />
            <img className="hidden lg:block" src="/img/header-desktop-4" alt="" />
            <img className="hidden lg:block" src="/img/header-desktop-5" alt="" />
          </div>
        </div>
      </header>
    </div>
  );
}
