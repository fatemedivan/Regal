import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/breadCrumb/Breadcrumb";
import { articlesList } from "@/constants/articles";

export default async function Page({ params }) {
  const { id } = await params;

  const article = articlesList.find((article) => article.id === parseInt(id));
  if (!article)
    return (
      <div className="flex flex-col justify-center items-center gap-6 my-12">
        <Image width={128} height={116} src="/img/order-not-found.svg" alt="" />
        <p className="text-sm leading-6 text-neutral-gray-9">
          بلاگ مورد نظر یافت نشد
        </p>
        <Link href={"/"}>
          <button className="bg-cognac-primery rounded-lg py-3.25 px-12 text-white leading-5.5 cursor-pointer">
            برو به صفحه اصلی
          </button>
        </Link>
      </div>
    );
  return (
    <div>
      <Breadcrumb
        items={[
          { label: "صفحه اصلی" },
          { label: "بلاگ ها" },
          { label: article?.title },
        ]}
      />
      <div className="container mx-auto px-10 lg:px-30 mt-12">
        <div className="flex justify-between flex-col lg:flex-row items-start mb-20 gap-6">
          <div className="lg:w-[60%]">
            <h1 className="text-neutral-gray-13 text-xl lg:text-4xl font-semibold">
              {article?.title}
            </h1>
            <p className="text-sm text-neutral-gray-12 leading-6 mt-4">
              سال جدید، سبک‌های جدیدی به همراه دارد. در این مقاله، نگاهی به
              ترندهای برتر دنیای مد در سال 2024 انداخته و نحوه تطبیق آن‌ها با
              استایل شخصی خود را بررسی کنید. در چند سال اخیر، دنیای مد به سرعت
              تغییر کرده و با ظهور ترندهای جدید و متنوعی مواجه شده است. در این
              متن، به بررسی جدیدترین ترندهای دنیای مد می‌پردازیم تا بتوانیم
              نگاهی جامع به آنچه که در این صنعت پویا اتفاق می‌افتد، بیندازیم.
            </p>
            <img
              className="mt-6 mx-auto lg:hidden"
              src={`/img/singleBlog-${id}.png`}
              alt=""
            />
            <div className="mt-6">
              <p className="text-neutral-gray-12 text-lg font-semibold">
                1. پایداری و مد دوست‌دار محیط زیست
              </p>
              <p className="text-sm text-neutral-gray-12 leading-6 mt-1">
                یکی از بزرگ‌ترین تحولات در صنعت مد، حرکت به سمت تولید لباس‌های
                پایدار و دوست‌دار محیط زیست است. بسیاری از برندهای معروف و
                نوظهور تلاش می‌کنند تا از مواد بازیافت‌شده یا ارگانیک در تولید
                پوشاک استفاده کنند. مصرف‌کنندگان نیز با تغییر در الگوی خرید خود،
                به محصولاتی که کمتر به محیط زیست آسیب می‌زنند، علاقه نشان
                می‌دهند.
              </p>
            </div>
            <div className="mt-6">
              <p className="text-neutral-gray-12 text-lg font-semibold">
                2. مد دیجیتال و واقعیت افزوده
              </p>
              <p className="text-sm text-neutral-gray-12 leading-6 mt-1">
                با گسترش تکنولوژی، مد دیجیتال و استفاده از واقعیت افزوده به یکی
                از ترندهای هیجان‌انگیز تبدیل شده‌اند. این تکنولوژی‌ها به کاربران
                اجازه می‌دهند تا قبل از خرید، لباس‌ها را به‌صورت مجازی امتحان
                کنند و همچنین برندها می‌توانند تجربه‌های خرید متفاوت و
                تعاملی‌تری ارائه دهند.
              </p>
            </div>
            <div className="mt-6">
              <p className="text-neutral-gray-12 text-lg font-semibold">
                3. استفاده از رنگ‌های نوین و پر انرژی
              </p>
              <p className="text-sm text-neutral-gray-12 leading-6 mt-1">
                سال 2024 شاهد بازگشت رنگ‌های شاد و پر انرژی است. رنگ‌هایی مثل
                نارنجی روشن، سبز فسفری و صورتی نئونی در انواع پوشاک ظاهر شده و
                نشان‌دهنده تمایل به فرار از یکنواختی و تقویت حس نشاط و سرزندگی
                است.
              </p>
            </div>
            <div className="mt-6">
              <p className="text-neutral-gray-12 text-lg font-semibold">
                4. بازگشت به دهه‌های گذشته
              </p>
              <p className="text-sm text-neutral-gray-12 leading-6 mt-1">
                همانطور که مد همواره از گذشته الهام می‌گیرد، این بار نیز شاهد
                بازگشت المان‌هایی از دهه‌های 70، 80 و 90 میلادی هستیم. شلوارهای
                پاچه‌گشاد، کت‌های اوورسایز و اکسسوری‌های متمایز از مهم‌ترین
                ویژگی‌های این ترند است.
              </p>
            </div>
            <div className="mt-6">
              <p className="text-neutral-gray-12 text-lg font-semibold">
                5. لباس‌های ورزشی و راحتی
              </p>
              <p className="text-sm text-neutral-gray-12 leading-6 mt-1">
                لباس‌های ورزشی و راحتی همچنان محبوبیت خود را حفظ کرده‌اند،
                به‌خصوص با افزایش شغل‌های دورکار و سبک زندگی فعال. این نوع
                لباس‌ها به‌گونه‌ای طراحی می‌شوند که علاوه بر راحتی، از نظر
                زیبایی‌شناسی نیز جالب توجه باشند.
              </p>
            </div>
            <div className="mt-6">
              <p className="text-neutral-gray-12 text-lg font-semibold">
                6. پترن‌ها و چاپ‌های جسورانه
              </p>
              <p className="text-sm text-neutral-gray-12 leading-6 mt-1">
                چاپ‌های جسورانه و پترن‌های غیرمتعارف در سال‌های اخیر به یکی از
                ترندهای عمده تبدیل شده‌اند. از حیوانات وحشی و گیاهان تا
                الگوبرداری از هنرهای خیابانی، این پترن‌ها به لباس‌ها شخصیت و
                استایل منحصر به فردی می‌بخشند.
              </p>
            </div>
          </div>

          <div className="lg:w-[40%] w-full flex flex-col gap-5">
            <img
              className="hidden lg:block"
              src={`/img/singleBlog-${id}.png`}
              alt=""
            />

            <div className="p-4 w-full border border-neutral-gray-4 rounded-lg">
              <textarea
                maxLength={200}
                placeholder="نظر خود را درباره بلاگ ثبت کنید..."
                className="placeholder:text-neutral-gray-7 placeholder:text-sm placeholder:leading-5 w-full h-full outline-none resize-none"
              ></textarea>
            </div>

            <div className="flex justify-end items-center">
              <button className="bg-cognac-primery rounded-lg py-3.25 px-15 text-white leading-5.5 cursor-pointer">
                ثبت نظر
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
