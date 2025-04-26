import Articles from "@/components/Articles";
import Comments from "@/components/Comments";
import OffProducts from "@/components/OffProducts";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header className="container max-w-full overflow-hidden pr-5 pt-8 mb-16 lg:flex justify-end items-center lg:ml-0 lg:gap-6 lg:pr-12 lg:pt-18 lg:mb-22">
        <div className="relative min-w-120 h-158 hidden lg:block">
          <Image
            fill
            className="mr-auto"
            src="/img/header-desktop-1.png"
            alt=""
            quality={100}
          />
        </div>
        <div className="text-neutral-gray-13">
          <div className="relative">
            <h1 className="font-semibold leading-7.5 text-2xl md:font-bold md:text-5xl md:max-w-150 md:leading-14.5 lg:ml-52">
              لباس هایی که{" "}
              <span className="px-0.25 pb-1 pt-3 bg-cognac-tint-1 inline-block ">
                داستان
              </span>{" "}
              شما را روایت می کنند
            </h1>
            <p className="mt-2 mb-3 text-sm leading-6 md:mb-4 md:leading-7 md:text-[1rem] lg:ml-52">
              هر لباس با دقت و عشق طراحی شده تا به شما احساس زیبایی و اعتماد به
              نفس بدهد.
            </p>
            <img
              src="/img/shape-header.png"
              className="hidden lg:block absolute -top-110 right-[55%] xl:-top-130"
              alt=""
            />
          </div>
          <div className="flex gap-2 items-center">
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
          <div className="flex items-center mt-6 mb-8 md:my-8">
            <button className="ml-6.25 text-sm leading-5 rounded-lg bg-cognac-primery text-white flex justify-center items-center py-2.5 gap-2 px-15 md:py-3.25 md:px-6 md:text-[1rem] lg:leading-5.5 cursor-pointer">
              مشاهده کالکشن‌ها
              <Image
                width={16}
                height={16}
                quality={100}
                src="/img/arrow-left2.svg"
                alt=""
              />
            </button>
            <Image
              width={45}
              height={79}
              className="relative mb-7"
              src="/img/Arrow.svg"
              alt=""
              quality={100}
            />
          </div>
          <div className="relative">
            <Image
              width={14}
              height={14}
              className="absolute w-14 h-14 -top-7 right-[57%] sm:right-74 lg:right-[55%] lg:w-26 lg:h-26 lg:-top-13"
              src="img/header-logo.svg"
              alt=""
              quality={100}
            />
            <div className="flex gap-3 items-center overflow-x-hidden">
              <Image
                width={150}
                height={150}
                className="lg:hidden object-cover"
                src="/img/header-mobile-1.png"
                alt=""
                quality={100}
              />
              <Image
                width={150}
                height={150}
                className="lg:hidden object-cover"
                src="/img/header-mobile-2.png"
                alt=""
                quality={100}
              />

              <Image
                width={150}
                height={150}
                className="object-cover lg:hidden rounded-xl"
                src="/img/header-mobile-3.png"
                alt=""
                quality={100}
              />
              <Image
                width={254}
                height={312}
                className="hidden lg:block"
                src="/img/header-desktop-2.png"
                alt=""
                quality={100}
              />
              <Image
                width={254}
                height={312}
                className="hidden lg:block"
                src="/img/header-desktop-3.png"
                alt=""
                quality={100}
              />
              <Image
                width={254}
                height={312}
                className="hidden lg:block"
                src="/img/header-desktop-4.png"
                alt=""
                quality={100}
              />
              <Image
                width={54}
                height={312}
                className="hidden lg:block"
                src="/img/header-desktop-5.png"
                alt=""
                quality={100}
              />
            </div>
          </div>
        </div>
      </header>
      <section className="container lg:mx-auto px-5 mb-16  max-w-336 mx-auto">
        <h5 className="font-semibold leading-5 text-black mt-16 mb-6">
          دسته بندی محصولات
        </h5>
        <div className="flex flex-wrap gap-4 lg:hidden">
          <div className="flex flex-col gap-4">
            <div className="h-71 relative w-41.75">
              <Image
                className="relative w-full h-auto z-20"
                src="/img/Category-1.png"
                alt=""
                fill
                quality={100}
              />
              <div className="relative z-40 top-57.5 px-2">
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
            <div className="h-35 relative w-41.75">
              <Image
                className="relative w-full h-auto z-20"
                src="/img/Category-3.png"
                alt=""
                fill
                quality={100}
              />
              <div className="relative z-40 top-21.5 px-2">
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
            <div className="h-50 relative w-41.75">
              <Image
                className="relative w-full h-auto z-20"
                src="/img/Category-6.png"
                alt=""
                fill
                quality={100}
              />
              <div className="relative z-40 top-36.5 px-2">
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
            <div className="h-51.5 relative w-41.75">
              <Image
                className="relative w-full h-auto z-20"
                src="/img/Category-8.png"
                alt=""
                fill
                quality={100}
              />
              <div className="relative z-40 top-37.5 px-2">
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

          <div className="flex flex-col gap-4">
            <div className="h-50 relative w-41.75">
              <Image
                className="relative w-full h-auto z-20"
                src="/img/Category-2.png"
                alt=""
                fill
                quality={100}
              />
              <div className="relative z-40 top-36.5 px-2">
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
            <div className="h-37.5 relative w-41.75">
              <Image
                className="relative w-full h-auto z-20"
                src="/img/Category-4.png"
                alt=""
                fill
                quality={100}
              />
              <div className="relative z-40 top-24 px-2">
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
            <div className="h-49 relative w-41.75">
              <Image
                className="relative w-full h-auto z-20"
                src="/img/Category-5.png"
                alt=""
                fill
                quality={100}
              />
              <div className="relative z-40 top-35.5 px-2">
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
            <div className="h-71 relative w-41.75">
              <Image
                className="relative w-full h-auto z-20"
                src="/img/Category-7.png"
                alt=""
                fill
                quality={100}
              />
              <div className="relative z-40 top-57.25 px-2">
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
            <Image
              src="/img/Category-desktop-1.png"
              alt="دسته‌بندی 1"
              className="w-full h-full object-cover"
              width={318}
              height={532}
              quality={100}
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
            <Image
              src="/img/Category-desktop-2.png"
              alt="دسته‌بندی 2"
              className="w-full h-full object-cover"
              width={318}
              height={256}
              quality={100}
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
          <div className="col-start-2 row-start-4 row-span-3 relative rounded-xl overflow-hidden">
            <Image
              src="/img/Category-desktop-3.png"
              alt="دسته‌بندی 3"
              className="w-full h-full object-cover"
              width={318}
              height={256}
              quality={100}
            />
            <div className="absolute bottom-4 mr-4 text-white">
              <h5 className="text-lg font-bold">سرهمی</h5>
              <div className="flex gap-2 mt-2">
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  روزمره
                </span>
                <span className="bg-white-15 border border-white-20 rounded-full px-3 py-1 backdrop-blur-sm text-sm">
                  کالکشن‌ جدید
                </span>
              </div>
            </div>
          </div>

          <div className="col-start-3 row-span-2 relative rounded-xl overflow-hidden">
            <Image
              src="/img/Category-desktop-4.png"
              alt="دسته‌بندی 4"
              className="w-full h-full object-cover"
              width={318}
              height={164}
              quality={100}
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
          <div className="col-start-3 row-start-3 row-span-2 relative rounded-xl overflow-hidden">
            <Image
              src="/img/Category-desktop-5.png"
              alt="دسته‌بندی 5"
              className="w-full h-full object-cover"
              width={318}
              height={164}
              quality={100}
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
          <div className="col-start-3 row-start-5 row-span-2 relative rounded-xl overflow-hidden">
            <Image
              src="/img/Category-desktop-6.png"
              alt="دسته‌بندی 6"
              className="w-full h-full object-cover"
              width={318}
              height={164}
              quality={100}
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

          <div className="col-start-4 row-span-2 relative rounded-xl overflow-hidden">
            <Image
              src="/img/Category-desktop-7.png"
              alt="دسته‌بندی 7"
              className="w-full h-full object-cover"
              width={318}
              height={164}
              quality={100}
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

          <div className="col-start-4 row-start-3 row-span-4 relative rounded-xl overflow-hidden">
            <Image
              src="/img/Category-desktop-8.png"
              alt="دسته‌بندی 8"
              className="w-full h-full object-cover"
              width={318}
              height={348}
              quality={100}
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
      <section className="bg-neutral-gray-1 py-8 lg:py-16 overflow-x-hidden">
        <h5 className="font-semibold leading-5 text-center mb-2 lg:font-bold lg:leading-11 lg:text-4xl lg:mb-4">
          <span className="text-cognac-primery">طراحـــــی </span>و دوخــــت بر
          اساس شکل بدن شما
        </h5>
        <p className="text-neutral-gray-11 text-center mb-6 mx-5 lg:text-sm lg:leading-6 lg:mb-10 lg:mx-40.5">
          در این بخش از فروشگاه ما، لباس‌ها و استایل‌هایی را پیدا می‌کنید که با
          فرم بدنی شما همخوانی دارند. ما به شما کمک می‌کنیم تا بهترین انتخاب‌ها
          را بر اساس فرم بدنی‌تان داشته باشید.برای شروع، کافیست فرم بدنی خود را
          انتخاب کنید تا ما به شما لباس‌هایی را پیشنهاد دهیم که به شما احساس
          راحتی و زیبایی بیشتری ببخشند.
        </p>
        <button className="flex justify-center items-center gap-2 mx-auto bg-neutral-gray-13 rounded-lg text-white text-sm leading-5 py-2.5 px-8.5 lg:text-[1rem] lg:leading-5.5 lg:py-3.25 lg:px-11 cursor-pointer">
          <Image
            width={16}
            height={16}
            className="mb-0.75"
            src="/img/scissor.svg"
            alt=""
            quality={100}
          />
          شخصی دوزی
        </button>
        <div className="flex justify-between items-center gap-3 mt-8 lg:mt-16 lg:gap-6 lg:justify-center 2xl:justify-between">
          <Image
            width={115}
            height={160}
            className="lg:hidden"
            src="/img/section-2-2.svg"
            alt=""
            quality={100}
          />
          <Image
            width={167}
            height={240}
            className="lg:hidden"
            src="/img/section-2-1.svg"
            alt=""
            quality={100}
          />
          <Image
            width={115}
            height={160}
            className="lg:hidden"
            src="/img/section-2-3.svg"
            alt=""
            quality={100}
          />
          <Image
            className="hidden lg:block"
            src="/img/section-2-desktop-1.png"
            alt=""
            width={300}
            height={244}
            quality={100}
          />
          <Image
            className="hidden lg:block"
            src="/img/section-2-desktop-2.png"
            alt=""
            width={250}
            height={348}
            quality={100}
          />
          <Image
            className="hidden lg:block"
            src="/img/section-2-desktop-3.png"
            alt=""
            width={374}
            height={520}
            quality={100}
          />
          <Image
            className="hidden lg:block"
            src="/img/section-2-desktop-4.png"
            alt=""
            width={250}
            height={348}
            quality={100}
          />
          <Image
            className="hidden lg:block"
            src="/img/section-2-desktop-5.png"
            alt=""
            width={300}
            height={244}
            quality={100}
          />
        </div>
      </section>
      <OffProducts />
      <section className="bg-neutral-gray-1 px-5 py-8 lg:flex lg:justify-center lg:gap-11.5 lg:px-12 lg:py-14">
        <div>
          <div className="sm:text-center">
            <h5 className="font-semibold leading-5 text-black lg:leading-9.5 lg:text-[31px] lg:font-bold">
              کشف شیک‌پوشی با{" "}
              <span className="text-cognac-primery">رگــــــــــــال</span>
            </h5>
            <p className="text-neutral-gray-11 leading-4.5 text-xs mt-2 mb-6 max-w-87.5 sm:mx-auto lg:max-w-184 lg:text-sm lg:leading-6 lg:mt-4 lg:mb-12">
              رگال جایی است که مد سلطنتی با ظرافت مدرن پیوند می‌خورد. ما
              مجموعه‌ای از لباس‌های بی‌نظیر و منحصر به فرد را برای بانوان باوقار
              و شیک‌پوش ارائه می‌دهیم که با انتخاب آن‌ها، اعتماد به نفس و زیبایی
              شما بیش از پیش نمایان خواهد شد.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 sm:justify-center lg:gap-6 lg:max-w-184 lg:grid lg:grid-cols-[auto_auto_auto]">
            <div className="max-w-42 lg:max-w-86">
              <Image
                width={56}
                height={56}
                className="p-2.5 lg:p-4"
                src="/img/ruler.svg"
                alt=""
                quality={100}
              />
              <h6 className="text-neutral-gray-13 text-sm leading-4 font-semibold mt-4 mb-2 lg:text-18 lg:leading-5.5 lg:font-bold lg:mt-6 lg:mb-4">
                طراحی منحصر به‌فرد
              </h6>
              <p className="text-neutral-gray-11 text-xs leading-4.5 lg:leading-6 lg:text-sm">
                هر لباس با طراحی سفارشی برای شما آماده می‌شود. ما با الهام از
                استایل شما، بهترین لباس‌ها را خلق می‌کنیم.
              </p>
            </div>
            <div className="hidden lg:block w-0.25 bg-neutral-gray-4 mx-6 my-7"></div>
            <div className="max-w-42 lg:max-w-86">
              <Image
                width={56}
                height={56}
                className="p-2.5 lg:p-4"
                src="/img/like.svg"
                alt=""
                quality={100}
              />
              <h6 className="text-neutral-gray-13 text-sm leading-4 font-semibold mt-4 mb-2 lg:text-18 lg:leading-5.5 lg:font-bold lg:mt-6 lg:mb-4">
                دوخت حرفه‌ای و اختصاصی
              </h6>
              <p className="text-neutral-gray-11 text-xs leading-4.5 lg:leading-6 lg:text-sm">
                تیم خیاطی ما هر لباس را با دقت و تخصص کامل می‌دوزد، تا لباسی با
                بالاترین استانداردهای دوخت داشته باشید.
              </p>
            </div>
            <div className="max-w-42 lg:max-w-86">
              <Image
                width={56}
                height={56}
                className="p-2.5 lg:p-4"
                src="/img/magic-star.svg"
                alt=""
                quality={100}
              />
              <h6 className="text-neutral-gray-13 text-sm leading-4 font-semibold mt-4 mb-2 lg:text-18 lg:leading-5.5 lg:font-bold lg:mt-6 lg:mb-4">
                تعهد به کیفیت
              </h6>
              <p className="text-neutral-gray-11 text-xs leading-4.5 lg:leading-6 lg:text-sm">
                ما به ارائه لباس‌هایی با بالاترین کیفیت پارچه و دوخت افتخار
                می‌کنیم، تمام مراحل تولید با دقت تمام انجام می‌شود.
              </p>
            </div>
            <div className="hidden lg:block top-45 h-28 w-0.25 bg-neutral-gray-4 mx-6 my-7"></div>
            <div className="max-w-42 lg:max-w-86">
              <Image
                width={56}
                height={56}
                className="p-2.5 lg:p-4"
                src="/img/headphone.svg"
                alt=""
                quality={100}
              />
              <h6 className="text-neutral-gray-13 text-sm leading-4 font-semibold mt-4 mb-2 lg:text-18 lg:leading-5.5 lg:font-bold lg:mt-6 lg:mb-4">
                پشتیبانی آنلاین و حضوری
              </h6>
              <p className="text-neutral-gray-11 text-xs leading-4.5 lg:leading-6 lg:text-sm">
                تیم ما همیشه آماده است تا به سوالات شما پاسخ دهد و در انتخاب و
                خرید لباس مورد نظرتان به شما کمک کند.
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-6 max-w-87.5 lg:max-w-max mx-auto lg:flex-row-reverse">
          <Image
            width={340}
            height={226}
            className="lg:hidden"
            src="/img/about-1.png"
            alt=""
            quality={100}
          />
          <Image
            className="hidden lg:block mt-29.5 max-w-68.5 max-h-128.5"
            src="/img/about-desktop-3.png"
            alt=""
            width={273}
            height={514}
            quality={100}
          />
          <div className="lg:w-68.5">
            <Image
              width={340}
              height={105}
              className="mb-4 lg:hidden"
              src="/img/about-2.png"
              alt=""
              quality={100}
            />
            <Image
              width={340}
              height={105}
              className="lg:hidden"
              src="/img/about-3.png"
              alt=""
              quality={100}
            />
            <Image
              className="hidden lg:block min-w-68.5 min-h-62 mb-4"
              src="/img/about-desktop-1.png"
              alt=""
              width={273}
              height={248}
              quality={100}
            />
            <Image
              className="hidden lg:block min-w-68.5 min-h-62"
              src="/img/about-desktop-2.png"
              alt=""
              width={273}
              height={248}
              quality={100}
            />
          </div>
        </div>
      </section>
      <Comments />
      <Articles />
    </>
  );
}
