import Articles from "@/components/home/Articles";
import Categories from "@/components/home/Categories";
import Comments from "@/components/home/Comments";
import OffProducts from "@/components/home/OffProducts";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  //get categories
  let categoriesData = [];
  try {
    const categoriesRes = await fetch(`${baseUrl}/categories`);
    categoriesData = await categoriesRes.json();
  } catch (error) {
    console.log(error);
  }

  //get off products
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  let discountedProducts = [];
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

    try {
      const res = await fetch(`${baseUrl}/products/discounted`, {
        headers : headers,
        cache: "no-store",
      });

      discountedProducts = await res.json();
    } catch (error) {
      console.log(error);
    }
  

  return (
    <>
      <header className="overflow-hidden pr-5 pt-8 mb-16 lg:pr-12 lg:pt-18 lg:mb-22">
        <div className="container mx-auto lg:ml-0 xl:mx-auto lg:flex justify-end items-center lg:gap-6">
          <div className="relative min-w-120 h-158 hidden pr-5 lg:block">
            <Image
              width={480}
              height={632}
              className="object-cover"
              src="/img/header-desktop-1.png"
              alt=""
              priority
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
                هر لباس با دقت و عشق طراحی شده تا به شما احساس زیبایی و اعتماد
                به نفس بدهد.
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
              <Link href={"/products"}>
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
              </Link>
              <Image
                width={45}
                height={80}
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
        </div>
      </header>
      <Categories categoriesData={categoriesData} />
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
        
        <div className="flex justify-center items-center gap-3 mt-8 lg:mt-16 lg:gap-6 sm:justify-between 2xl:justify-between">
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
      <OffProducts discountedProducts={discountedProducts} />
      <section className="bg-neutral-gray-1 px-5 py-8 lg:px-12 lg:py-14">
        <div className="container mx-auto lg:flex lg:justify-center lg:gap-11.5">
          <div>
            <div className="sm:text-center">
              <h5 className="font-semibold leading-5 text-black lg:leading-9.5 lg:text-[31px] lg:font-bold">
                کشف شیک‌پوشی با{" "}
                <span className="text-cognac-primery">رگــــــــــــال</span>
              </h5>
              <p className="text-neutral-gray-11 leading-4.5 text-xs mt-2 mb-6 max-w-87.5 sm:mx-auto lg:max-w-184 lg:text-sm lg:leading-6 lg:mt-4 lg:mb-12">
                رگال جایی است که مد سلطنتی با ظرافت مدرن پیوند می‌خورد. ما
                مجموعه‌ای از لباس‌های بی‌نظیر و منحصر به فرد را برای بانوان
                باوقار و شیک‌پوش ارائه می‌دهیم که با انتخاب آن‌ها، اعتماد به نفس
                و زیبایی شما بیش از پیش نمایان خواهد شد.
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
                  تیم خیاطی ما هر لباس را با دقت و تخصص کامل می‌دوزد، تا لباسی
                  با بالاترین استانداردهای دوخت داشته باشید.
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
        </div>
      </section>
      <Comments />
      <Articles />
    </>
  );
}
