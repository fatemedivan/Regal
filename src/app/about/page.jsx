import Breadcrumb from "@/components/Breadcrumb";
import React from "react";

export default function Page() {
  return (
    <div>
      <Breadcrumb items={[{ label: "صفحه اصلی" }, { label: "درباره ما " }]} />
      <div className="mt-12 mb-20 container mx-auto px-10 lg:px-41 flex gap-7 justify-center items-center">
        <div className="lg:w-[60%]">
          <h1 className="text-cognac-primery text-4xl font-semibold">
            <span className="text-black">درباره</span> رگــــال
          </h1>
          <p className="text-sm text-neutral-gray-11 leading-6 mt-3">
            همه‌چیز از یک ایده ساده شروع شد: ایجاد مزونی که زیبایی، اصالت و
            سفارشی‌سازی را در یک تجربه منحصر به فرد ترکیب کند. ما در دنیایی
            زندگی می‌کنیم که لباس چیزی فراتر از پوشش است؛ لباس نمایانگر شخصیت،
            سبک و حتی باورهای ماست. با همین دیدگاه، برند ما در سال 1403
            بنیان‌گذاری شد تا به زنان امکان دهد لباسی بپوشند که نه تنها زیباست،
            بلکه دقیقاً با خواسته‌ها و اندازه‌های آن‌ها همخوانی دارد. در قلب
            برند ما، این اعتقاد وجود دارد که هر زن باید لباسی بپوشد که به‌طور
            کامل با او هماهنگ باشد. به همین دلیل است که ما از تکنولوژی
            سفارشی‌سازی زنده و چت مستقیم با طراحان استفاده می‌کنیم تا هر مشتری،
            بهترین تجربه خرید را داشته باشد.
          </p>
          <div className="lg:hidden flex justify-center items-center my-6">
            <img src="/img/aboutpage-mobile.png" alt="" />
          </div>
          <div className="mt-8">
            <div className="flex gap-5 px-6 py-4 border-b border-neutral-gray-4">
              <img src="/img/tick-circle.svg" alt="" />
              <p className="text-neutral-gray-13 text-sm leading-6">
                طراحی لباس‌های سفارشی با انتخاب پارچه، رنگ، و جزئیات منحصر به
                فرد، دقیقاً مطابق با سلیقه شما.
              </p>
            </div>
            <div className="flex gap-5 px-6 py-4 border-b border-neutral-gray-4">
              <img src="/img/tick-circle.svg" alt="" />
              <p className="text-neutral-gray-13 text-sm leading-6">
                تجربه خرید آسان و سفارشی‌سازی زنده با راهنمای قدم به قدم برای
                اندازه‌گیری دقیق.
              </p>
            </div>
            <div className="flex gap-5 px-6 py-4 border-b border-neutral-gray-4">
              <img src="/img/tick-circle.svg" alt="" />
              <p className="text-neutral-gray-13 text-sm leading-6">
                ارسال سریع با گزینه‌های مختلف تحویل حضوری و آنلاین، بسته به نیاز
                و موقعیت شما.
              </p>
            </div>
            <div className="flex gap-5 px-6 py-4">
              <img src="/img/tick-circle.svg" alt="" />
              <p className="text-neutral-gray-13 text-sm leading-6">
                دسترسی به ترندهای روز دنیا و جدیدترین سبک‌های مد، همه در رگال.
              </p>
            </div>
          </div>
        </div>

        <div className="hidden w-[40%] lg:flex gap-6">
          <div className="flex flex-col gap-6">
            <img src="/img/aboutpage-2.png" alt="" />
            <img src="/img/aboutpage-3.png" alt="" />
          </div>
          <div className="mt-8">
            <img src="/img/aboutpage-1.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
