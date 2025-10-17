import Image from "next/image";

export default function KeyFeatures() {
  return (
    <section className="bg-neutral-gray-1 px-5 py-8 lg:px-12 lg:py-14">
      <div className="container mx-auto lg:flex lg:justify-center lg:gap-11.5">
        <div>
          <div className="sm:text-center">
            <h5 className="font-semibold leading-5 text-black lg:leading-9.5 lg:text-[31px] lg:font-bold">
              کشف شیک‌پوشی با
              <span className="text-cognac-primery">رگــــــــــــال</span>
            </h5>
            <p className="text-neutral-gray-11 leading-4.5 text-xs mt-2 mb-6 max-w-87.5 sm:mx-auto lg:max-w-184 lg:text-sm lg:leading-6 lg:mt-4 lg:mb-12">
              رگال جایی است که مد سلطنتی با ظرافت مدرن پیوند می‌خورد. ما
              مجموعه‌ای از لباس‌های بی‌نظیر و منحصر به فرد را برای بانوان باوقار
              و شیک‌پوش ارائه می‌دهیم که با انتخاب آن‌ها، اعتماد به نفس و زیبایی
              شما بیش از پیش نمایان خواهد شد.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center lg:gap-6 lg:max-w-184 lg:grid lg:grid-cols-[auto_auto_auto]">
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
      </div>
    </section>
  );
}
