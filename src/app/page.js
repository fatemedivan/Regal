export default function Home() {
  return (
    <div>
      <header className="max-h-158 mx-5 mt-28 mb-16 lg:flex items-center lg:ml-0 lg:gap-6 lg:mr-12 lg:mt-39 lg:mb-22">
        <img
          className="hidden lg:block mr-auto"
          src="/img/header-desktop-1.png"
          alt=""
        />
        <div className="text-neutral-gray-13">
          <div className="relative max-w-348">
            <h1 className="font-semibold leading-7.5 text-2xl md:font-bold md:text-5xl md:max-w-150 md:leading-14.5 lg:ml-52">
              لباس هایی که{" "}
              <span className="px-0.25 py-1 bg-cognac-tint1 inline-block ">
                داستان
              </span>{" "}
              شما را روایت می کنند
            </h1>
            <p className="mt-2 mb-3 text-sm leading-6 md:mb-4 md:leading-7 md:text-[1rem] lg:ml-52">
              هر لباس با دقت و عشق طراحی شده تا به شما احساس زیبایی و اعتماد به
              نفس بدهد.
            </p>
            <img
              className="absolute w-205 h-212 -top-100 rotate-235 -z-10 -left-140 hidden lg:block overflow-hidden"
              src="/img/shape-6.png"
              alt=""
            />
          </div>
          <div className="flex gap-2 items-center overflow-x-hidden">
            <div className="leading-4.5 text-xs text-neutral-gray-11 px-4 py-0.5 bg-neutral-gray-2 border-1 border-neutral-gray-4 rounded-100 md:py-2.5 md:px-6 md:text-sm md:leading-5 text-nowrap">
              کالکشن‌های متنوع
            </div>
            <div className="leading-4.5 text-xs text-neutral-gray-11 px-4 py-0.5 bg-neutral-gray-2 border-1 border-neutral-gray-4 rounded-100 md:py-2.5 md:px-6 md:text-sm md:leading-5 text-nowrap">
              مد و فشن
            </div>
            <div className="leading-4.5 text-xs text-neutral-gray-11 px-4 py-0.5 bg-neutral-gray-2 border-1 border-neutral-gray-4 rounded-100 md:py-2.5 md:px-6 md:text-sm md:leading-5 text-nowrap">
              استایل‌های خاص
            </div>
            <div className="leading-4.5 text-xs text-neutral-gray-11 px-4 py-0.5 bg-neutral-gray-2 border-1 border-neutral-gray-4 rounded-100 md:py-2.5 md:px-6 flex gap-3 md:text-sm md:leading-5 text-nowrap">
              رنگ‌بندی‌های جذاب
              <div className="w-2 h-2 my-auto rounded-100 bg-[#D5AC97] md:w-4 md:h-4"></div>
              <div className="w-2 h-2 my-auto rounded-100 bg-[#C5AF86] md:w-4 md:h-4"></div>
              <div className="w-2 h-2 my-auto rounded-100 bg-[#977B71] md:w-4 md:h-4"></div>
              <div>...</div>
            </div>
          </div>
          <div className="flex items-center mt-6 mb-8 md:my-4 lg:my-1 xl:my-4">
            <button className="ml-6.25 text-sm leading-5 rounded-lg bg-cognac-primery text-white flex justify-center items-center py-2.5 gap-2 px-8 md:py-3.25 md:px-6">
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
      <section className="container px-5 mb-16 mx-auto max-w-336">
        <h5 className="font-semibold leading-5 text-black mt-16 mb-6">
          دسته بندی محصولات
        </h5>
        <div className="flex flex-wrap gap-4 lg:hidden">
          <div className="flex flex-col md:flex-row md:mx-auto gap-4">
            <div className="w-full h-full">
              <img
                className="relative w-full h-full md:h-auto z-20"
                src="/img/Category-1.png"
                alt=""
              />
              <div className="relative z-40 bottom-16 px-2">
                <h5 className="leading-5 font-semibold text-white">
                  پیراهن کوتاه
                </h5>
                <div className="flex items-center gap-1 mt-1 mb-2 text-white">
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">دخترانه</p>
                  </div>
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">مناسب مهمانی</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full">
              <img
                className="relative w-full h-full md:h-auto  z-20"
                src="/img/Category-3.png"
                alt=""
              />
              <div className="relative z-40 bottom-16 px-2">
                <h5 className="leading-5 font-semibold text-white">سرهمی</h5>
                <div className="flex items-center gap-1 mt-1 mb-2 text-white">
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">روزمره</p>
                  </div>
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">کالکشن جدید</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full">
              <img
                className="relative w-full h-full md:h-auto  z-20"
                src="/img/Category-6.png"
                alt=""
              />
              <div className="relative z-40 bottom-16 px-2">
                <h5 className="leading-5 font-semibold text-white">
                  شومیز و بلوز
                </h5>
                <div className="flex items-center gap-1 mt-1 mb-2 text-white">
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">تمام فصول</p>
                  </div>
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5"> کژوال</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full">
              <img
                className="relative w-full h-full md:h-auto  z-20"
                src="/img/Category-8.png"
                alt=""
              />
              <div className="relative z-40 bottom-16 px-2">
                <h5 className="leading-5 font-semibold text-white">
                  تاپ و کراپ
                </h5>
                <div className="flex items-center gap-1 mt-1 mb-2 text-white">
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">مجلسی</p>
                  </div>
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">روزمره</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:mx-auto gap-4">
            <div className="w-full h-full">
              <img
                className="relative w-full h-full md:h-auto  z-20"
                src="/img/Category-2.png"
                alt=""
              />
              <div className="relative z-40 bottom-16 px-2">
                <h5 className="leading-5 font-semibold text-white">شلوار</h5>
                <div className="flex items-center gap-1 mt-1 mb-2 text-white">
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">استایل روزمره</p>
                  </div>
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">رسمی</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full">
              <img
                className="relative w-full h-full md:h-auto  z-20"
                src="/img/Category-4.png"
                alt=""
              />
              <div className="relative z-40 bottom-16 px-2">
                <h5 className="leading-5 font-semibold text-white">
                  کت و جلیقه
                </h5>
                <div className="flex items-center gap-1 mt-1 mb-2 text-white">
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">کلاسیک</p>
                  </div>
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">مینیمال</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full">
              <img
                className="relative w-full h-full md:h-auto  z-20"
                src="/img/Category-5.png"
                alt=""
              />
              <div className="relative z-40 bottom-16 px-2">
                <h5 className="leading-5 font-semibold text-white">دامن</h5>
                <div className="flex items-center gap-1 mt-1 mb-2 text-white">
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">تابستانه</p>
                  </div>
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">پاییزه</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full">
              <img
                className="relative w-full h-full md:h-auto  z-20"
                src="/img/Category-7.png"
                alt=""
              />
              <div className="relative z-40 bottom-16 px-2">
                <h5 className="leading-5 font-semibold text-white">
                  ترنچ کت و پالتو
                </h5>
                <div className="flex items-center gap-1 mt-1 mb-2 text-white">
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">گرم و سبک</p>
                  </div>
                  <div className="px-2 py-0.5 bg-white-15 border border-white-20 rounded-100 backdrop-blur-[20px]">
                    <p className="text-xs leading-4.5">مدرن</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:grid grid-cols-4 grid-rows-6 gap-5">
          <div className="col-span-1 row-span-6 relative rounded-xl overflow-hidden">
            <img
              src="/img/Category-desktop-1.png"
              alt="دسته‌بندی 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 mr-4 text-white">
              <h5 className="text-lg font-bold">پیراهن کوتاه</h5>
              <div className="flex gap-2 mt-2">
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  دخترانه
                </span>
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  مناسب مهمانی
                </span>
              </div>
            </div>
          </div>

          <div className="col-start-2 row-span-3 relative rounded-xl overflow-hidden">
            <img
              src="/img/Category-desktop-2.png"
              alt="دسته‌بندی 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 mr-4 text-white">
              <h5 className="text-lg font-bold">سرهمی</h5>
              <div className="flex gap-2 mt-2">
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  روزمره
                </span>
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  کالکشن جدید
                </span>
              </div>
            </div>
          </div>
          <div className="col-start-2 row-start-4 row-span-3 relative rounded-xl overflow-hidden">
            <img
              src="/img/Category-desktop-3.png"
              alt="دسته‌بندی 3"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 mr-4 text-white">
              <h5 className="text-lg font-bold">شومیز و بلوز</h5>
              <div className="flex gap-2 mt-2">
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  تمام فصول
                </span>
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  کژوال
                </span>
              </div>
            </div>
          </div>

          <div className="col-start-3 row-span-2 relative rounded-xl overflow-hidden">
            <img
              src="/img/Category-desktop-4.png"
              alt="دسته‌بندی 4"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 mr-4 text-white">
              <h5 className="text-lg font-bold">تاپ و کراپ</h5>
              <div className="flex gap-2 mt-2">
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  مجلسی
                </span>
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  روزمره
                </span>
              </div>
            </div>
          </div>
          <div className="col-start-3 row-start-3 row-span-2 relative rounded-xl overflow-hidden">
            <img
              src="/img/Category-desktop-5.png"
              alt="دسته‌بندی 5"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 mr-4 text-white">
              <h5 className="text-lg font-bold">شلوار</h5>
              <div className="flex gap-2 mt-2">
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  استایل روزمره
                </span>
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  رسمی
                </span>
              </div>
            </div>
          </div>
          <div className="col-start-3 row-start-5 row-span-2 relative rounded-xl overflow-hidden">
            <img
              src="/img/Category-desktop-6.png"
              alt="دسته‌بندی 6"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 mr-4 text-white">
              <h5 className="text-lg font-bold">کت و جلیقه</h5>
              <div className="flex gap-2 mt-2">
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  کلاسیک
                </span>
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  مینیمال
                </span>
              </div>
            </div>
          </div>

          <div className="col-start-4 row-span-2 relative rounded-xl overflow-hidden">
            <img
              src="/img/Category-desktop-7.png"
              alt="دسته‌بندی 7"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 mr-4 text-white">
              <h5 className="text-lg font-bold">دامن</h5>
              <div className="flex gap-2 mt-2">
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  تابستانه
                </span>
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  پاییزه
                </span>
              </div>
            </div>
          </div>

          <div className="col-start-4 row-start-3 row-span-4 relative rounded-xl overflow-hidden">
            <img
              src="/img/Category-desktop-8.png"
              alt="دسته‌بندی 8"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 mr-4 text-white">
              <h5 className="text-lg font-bold">ترنچ کت و پالتو</h5>
              <div className="flex gap-2 mt-2">
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  گرم و سبگ
                </span>
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  مدر ن
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
