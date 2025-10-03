import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const badges = [
    { text: "کالکشن‌های متنوع" },
    { text: "مد و فشن" },
    { text: "استایل‌های خاص" },
  ];

  const colors = ["#D5AC97", "#C5AF86", "#977B71"];

  return (
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
              لباس هایی که
              <span className="px-0.25 pb-1 pt-3 bg-cognac-tint-1 inline-block ">
                داستان
              </span>
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
            {badges.map((badge) => (
              <div
                key={badge.text}
                className="leading-4.5 text-xs text-neutral-gray-11 px-4 py-0.5 bg-neutral-gray-2 border-1 border-neutral-gray-4 rounded-100 md:py-2.5 md:px-6 md:text-sm md:leading-5 text-nowrap"
              >
                {badge.text}
              </div>
            ))}
            <div className="leading-4.5 text-xs text-neutral-gray-11 px-4 py-0.5 bg-neutral-gray-2 border-1 border-neutral-gray-4 rounded-100 md:py-2.5 md:px-6  gap-3 md:text-sm md:leading-5 text-nowrap hidden sm:flex">
              رنگ‌بندی‌های جذاب
              {colors.map((color, index) => (
                <div
                  key={index}
                  style={{ backgroundColor: color }}
                  className="w-2 h-2 my-auto rounded-100 md:w-4 md:h-4"
                ></div>
              ))}
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
                className="object-cover lg:hidden rounded-xl ml-5"
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
  );
}
