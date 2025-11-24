import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <div className="bg-[#0B0C17] p-5 lg:hidden">
        <div className="container mx-auto">
          <Image
            width={94}
            height={40}
            quality={100}
            src="/img/logo-footer.svg"
            alt=""
          />
          <p className="text-white leading-6 text-sm my-3 max-w-87.5 lg:max-w-108">
            به فروشگاه رگال خوش آمدید، جایی که استایل و شیک بودن به شما هدیه
            داده می‌شود. با خبرنامه رگال همراه باشید و اولین نفر باشید که اخبار،
            پیشنهادات و توصیه‌های دنیای مد و فشن را می شنوید.
          </p>
          <div className="flex items-center gap-3.5">
            <input
              type="text"
              placeholder="ایمیل خود را وارد کنید..."
              className="rounded-lg placeholder:text-neutral-gray-3 placeholder:text-sm placeholder:leading-5 border-1 border-neutral-gray-8 pr-6 py-3.5 text-white outline-none"
            />
            <button className="px-6 py-3.25 border-1 border-neutral-gray-8 text-neutral-gray-3 rounded-[10px] flex justify-center items-center">
              عضویت
            </button>
          </div>
          <div className="flex mt-8 gap-13">
            <ul>
              <li className="mb-3 ml-1.25 text-white flex justify-center items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <h5 className="leading-5 font-semibold">لینک‌های کمکی</h5>
              </li>
              <li className="px-4 py-2.5 text-neutral-gray-3 leading-6 text-sm">
                <a href="">قوانین و مقررات</a>
              </li>
              <li className="px-4 py-2.5 text-neutral-gray-3 leading-6 text-sm">
                <a href="">حریم خصوصی</a>
              </li>
              <li className="px-4 py-2.5 text-neutral-gray-3 leading-6 text-sm">
                <a href="">سوالات متداول</a>
              </li>
            </ul>
            <ul>
              <li className="mb-3 ml-1.25 text-white flex justify-center items-center gap-2.5">
                <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                <h5 className="leading-5 font-semibold">دسته محصولات</h5>
              </li>
              <li className="px-4 py-2.5 text-neutral-gray-3 leading-6 text-sm">
                <Link href={"/products"}>پیراهن کوتاه</Link>
              </li>
              <li className="px-4 py-2.5 text-neutral-gray-3 leading-6 text-sm">
                <Link href={"/products"}>شومیز و دامن</Link>
              </li>
              <li className="px-4 py-2.5 text-neutral-gray-3 leading-6 text-sm">
                <Link href={"/products"}>شلوار</Link>
              </li>
              <li className="px-4 py-2.5 text-neutral-gray-3 leading-6 text-sm">
                <Link href={"/products"}>سرهمی</Link>
              </li>
              <li className="px-4 py-2.5 text-neutral-gray-3 leading-6 text-sm">
                <Link href={"/products"}>کت و ترنچ کت</Link>
              </li>
            </ul>
          </div>
          <ul className="pt-4 pb-6 border-b-1 border-neutral-gray-12 text-neutral-gray-3">
            <li className="py-2 flex gap-2 leading-6 text-sm">
              <Image
                width={16}
                height={16}
                quality={100}
                src="/img/location.svg"
                alt=""
              />
              تهران،‌ خیابان ولیعصر نرسیده به میدان ونک، پلاک ۲۰
            </li>
            <li className="py-2 flex  gap-2 leading-6 text-sm">
              <Image
                width={16}
                height={16}
                quality={100}
                src="/img/clock.svg"
                alt=""
              />
              شنبه تا چهارشنبه 9 صبح الی 18
            </li>
            <li className="py-2 flex gap-2 leading-6 text-sm">
              <Image
                width={16}
                height={16}
                quality={100}
                src="/img/call-calling.svg"
                alt=""
              />
              ۰۲۱ - ۱۲۳۴ ۵۶۷۹ | ۰۲۱ - ۱۲۳۴ ۵۶۷۸
            </li>
            <li className="py-2 flex gap-2 leading-6 text-sm">
              <Image
                width={16}
                height={16}
                quality={100}
                src="/img/sms.svg"
                alt=""
              />
              Info@regal.com
            </li>
          </ul>
          <div className="mt-6 border-b-1 border-neutral-gray-12">
            <p className="text-white leading-6 text-sm mb-4">
              ما را در شبکه‌های اجتماعی دنبال کنید:
            </p>
            <div className="flex justify-end gap-2 mb-6">
              <div className="p-3.5 border-1 border-neutral-gray-8 rounded-lg">
                <Image
                  width={20}
                  height={20}
                  quality={100}
                  src="/img/Telegram.svg"
                  alt=""
                />
              </div>
              <div className="p-3.5 border-1 border-neutral-gray-8 rounded-lg">
                <Image
                  width={20}
                  height={20}
                  quality={100}
                  src="/img/Whatsapp.svg"
                  alt=""
                />
              </div>
              <div className="p-3.5 border-1 border-neutral-gray-8 rounded-lg">
                <Image
                  width={20}
                  height={20}
                  quality={100}
                  src="/img/instagram.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="flex items-center mt-4">
            <Image
              width={16}
              height={16}
              quality={100}
              src="/img/copyright.svg"
              alt=""
            />
            <p className="mr-2 text-neutral-gray-9 leading-4.5 text-xs">
              تمامی حقوق مادی و معنوی برای مجموعه رگال محفوظ است.
            </p>
          </div>
        </div>
      </div>
      <div className="bg-[#0B0C17] px-12 hidden lg:block">
        <div className="container mx-auto">
          <div className="flex items-center border-b-1 border-neutral-gray-12">
            <div className="mb-32">
              <Image
                width={75}
                height={32}
                quality={100}
                src="/img/logo-footer.svg"
                alt=""
              />
              <p className="text-white leading-6 text-sm mt-3.5 mb-4 max-w-108">
                به فروشگاه رگال خوش آمدید، جایی که استایل و شیک بودن به شما هدیه
                داده می‌شود. با خبرنامه رگال همراه باشید و اولین نفر باشید که
                اخبار، پیشنهادات و توصیه‌های دنیای مد و فشن را می شنوید.
              </p>
              <div className="flex items-center gap-3.5 max-w-108">
                <input
                  type="text"
                  placeholder="ایمیل خود را وارد کنید..."
                  className="rounded-lg placeholder:text-neutral-gray-3 placeholder:text-sm placeholder:leading-5 border-1 border-neutral-gray-8 text-white pr-6 pl-22 py-3.5"
                />
                <button className="px-6 py-3.25 border-1 border-neutral-gray-8 text-neutral-gray-3 rounded-[10px] text-center leading-5.5">
                  عضویت
                </button>
              </div>
            </div>
            <div className="h-97 py-6 mx-8 relative">
              <div className="w-0.25 h-85 bg-neutral-gray-12"></div>
              <div className="w-6.25 h-17.5 rounded-100 bg-neutral-gray-13 absolute top-12 translate-x-[50%]">
                <Image
                  width={24}
                  height={24}
                  className="py-5.75"
                  src="/img/arrow-right.svg"
                  alt=""
                  quality={100}
                />
              </div>
            </div>
            <div className="flex gap-8 mt-20 mb-12">
              <ul>
                <li className="mb-6 text-white flex justify-center items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <h5 className="leading-5 font-semibold text-nowrap">
                    لینک‌های کمکی
                  </h5>
                </li>
                <li className="py-2.5 text-neutral-gray-3 leading-6 text-sm">
                  <a href="">قوانین و مقررات</a>
                </li>
                <li className="py-2.5 text-neutral-gray-3 leading-6 text-sm">
                  <a href="">حریم خصوصی</a>
                </li>
                <li className="py-2.5 text-neutral-gray-3 leading-6 text-sm">
                  <a href="">سوالات متداول</a>
                </li>
              </ul>
              <ul>
                <li className="mb-6 text-white flex justify-center items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <h5 className="leading-5 font-semibold text-nowrap">
                    دسته محصولات
                  </h5>
                </li>
                <li className="py-2.5 text-neutral-gray-3 leading-6 text-sm">
                  <Link href={"/products"}>پیراهن کوتاه</Link>
                </li>
                <li className="py-2.5 text-neutral-gray-3 leading-6 text-sm">
                  <Link href={"/products"}>شومیز و دامن</Link>
                </li>
                <li className="py-2.5 text-neutral-gray-3 leading-6 text-sm">
                  <Link href={"/products"}>شلوار</Link>
                </li>
                <li className="py-2.5 text-neutral-gray-3 leading-6 text-sm">
                  <Link href={"/products"}>سرهمی</Link>
                </li>
                <li className="py-2.5 text-neutral-gray-3 leading-6 text-sm">
                  <Link href={"/products"}>کت و ترنچ کت</Link>
                </li>
              </ul>
              <ul>
                <li className="mb-6 text-white flex justify-center items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <h5 className="leading-5 font-semibold text-nowrap">
                    ارتباط با ما
                  </h5>
                </li>
                <li className="py-2.5 text-neutral-gray-3 leading-6 text-sm">
                  <a href="">تماس با ما</a>
                </li>
                <li className="py-2.5 text-neutral-gray-3 leading-6 text-sm">
                  <a href="">درباره ما</a>
                </li>
                <li className="py-2.5 text-neutral-gray-3 leading-6 text-sm">
                  <a href="">همکاری با ما</a>
                </li>
              </ul>
              <ul className="text-neutral-gray-3">
                <li className="mb-6 text-white flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                  <h5 className="leading-5 font-semibold text-nowrap">
                    اطلاعات تماس
                  </h5>
                </li>
                <li className="py-2 flex gap-2 leading-6 text-sm">
                  <Image
                    width={16}
                    height={16}
                    src="/img/call-calling.svg"
                    alt=""
                    quality={100}
                  />
                  ۰۲۱ - ۱۲۳۴ ۵۶۷۹ | ۰۲۱ - ۱۲۳۴ ۵۶۷۸
                </li>
                <li className="py-2 flex gap-2 leading-6 text-sm">
                  <Image
                    width={16}
                    height={16}
                    quality={100}
                    src="/img/sms.svg"
                    alt=""
                  />
                  Info@regal.com
                </li>
                <li className="py-2 flex gap-2 leading-6 text-sm">
                  <Image
                    width={16}
                    height={16}
                    quality={100}
                    src="/img/location.svg"
                    alt=""
                  />
                  تهران،‌ خیابان ولیعصر نرسیده به میدان ونک، پلاک ۲۰
                </li>
                <li className="py-2 flex gap-2 leading-6 text-sm">
                  <Image
                    width={16}
                    height={16}
                    quality={100}
                    src="/img/clock.svg"
                    alt=""
                  />
                  شنبه تا چهارشنبه 9 صبح الی 18
                </li>
              </ul>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 border-t border-t-neutral-gray-12">
            <div className="flex items-center">
              <Image
                width={16}
                height={16}
                quality={100}
                src="/img/copyright.svg"
                alt=""
              />
              <p className="mr-2 text-neutral-gray-9 leading-6 text-sm">
                تمامی حقوق مادی و معنوی برای مجموعه رگال محفوظ است.
              </p>
            </div>
            <div className="flex gap-2">
              <div className="p-3.5 border-1 border-neutral-gray-8 rounded-lg">
                <Image
                  width={20}
                  height={20}
                  quality={100}
                  src="/img/Telegram.svg"
                  alt=""
                />
              </div>
              <div className="p-3.5 border-1 border-neutral-gray-8 rounded-lg">
                <Image
                  width={20}
                  height={20}
                  quality={100}
                  src="/img/Whatsapp.svg"
                  alt=""
                />
              </div>
              <div className="p-3.5 border-1 border-neutral-gray-8 rounded-lg">
                <Image
                  width={20}
                  height={20}
                  quality={100}
                  src="/img/instagram.svg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
