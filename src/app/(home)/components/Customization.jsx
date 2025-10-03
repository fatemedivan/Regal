import Image from "next/image";

export default function Customization() {
  return (
    <section className="bg-neutral-gray-1 py-8 lg:py-16 overflow-x-hidden">
      <h5 className="font-semibold leading-5 text-center mb-2 lg:font-bold lg:leading-11 lg:text-4xl lg:mb-4">
        <span className="text-cognac-primery">طراحـــــی </span>و دوخــــت بر
        اساس شکل بدن شما
      </h5>
      <p className="text-neutral-gray-11 text-center mb-6 mx-5 lg:text-sm lg:leading-6 lg:mb-10 lg:mx-40.5">
        در این بخش از فروشگاه ما، لباس‌ها و استایل‌هایی را پیدا می‌کنید که با
        فرم بدنی شما همخوانی دارند. ما به شما کمک می‌کنیم تا بهترین انتخاب‌ها را
        بر اساس فرم بدنی‌تان داشته باشید.برای شروع، کافیست فرم بدنی خود را
        انتخاب کنید تا ما به شما لباس‌هایی را پیشنهاد دهیم که به شما احساس راحتی
        و زیبایی بیشتری ببخشند.
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
  );
}
