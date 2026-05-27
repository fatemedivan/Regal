<div dir="rtl">

## ✨ معرفی Regal

**رگال | فروشگاه آنلاین فول استک پوشاک زنانه**

تکنولوژی‌ها: Leaflet, Zod, React hook form, PostgreSQL, Prisma, Tailwind CSS, TypeScript, Next.js

ویژگی‌ها: معماری ماژولار، طراحی ریسپانسیو، جستجو و فیلتر هوشمند، سبد خرید پویا، پنل کاربری کامل (شامل علاقه مندی ها، آدرس ها و پیگیری سفارشات)

## 🎬 دمو آنلاین

برای مشاهدهٔ نسخه زندهٔ پروژه، می‌توانید از لینک زیر استفاده کنید:

[Regal Live Demo](https://regaal.vercel.app)

![تصویر پروژه Regal](/assets/screenshot-regal.png)

## ⭐ ویژگی‌های کلیدی

**صفحهٔ محصولات**  
 نمایش تمام محصولات همراه با قابلیت جستجو، فیلتر و مرتب‌سازی پیشرفته.

**صفحهٔ محصول تکی**  
 شامل گالری چندعکس، انتخاب سایز و رنگ، مشخصات کامل محصول و نمایش محصولات مشابه.

**سبد خرید و فرآیند خرید**  
 امکان افزودن محصول با ویژگی‌های انتخاب‌شده و ادامه مراحل خرید.

**دسته‌بندی محصولات**  
 هر محصول دارای دسته‌بندی مشخص است و کاربران می‌توانند محصولات مرتبط را مشاهده کنند.

**مدیریت حساب کاربری**  
 امکان افزودن، حذف و ویرایش آدرس‌ها، مشاهده وضعیت سفارش‌ها و مدیریت علاقه‌مندی‌ها.

**رابط کاربری مینیمال و واکنش‌گرا**  
 تجربه‌ای روان و یکپارچه در تمامی دستگاه‌ها با طراحی مدرن.

**بک‌اند مدرن با Next.js، Prisma و PostgreSQL**  
 زیرساخت قابل‌گسترش و امن با **Next.js**، مدیریت دیتابیس با **Prisma** و ذخیره‌سازی دیتا روی **PostgreSQL**.

</div>

## 🛠️ تکنولوژی‌ها

<p align="center">
  <img src="https://img.shields.io/badge/-Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" height="60" />
  <img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" height="60" />
  <img src="https://img.shields.io/badge/-TailwindCSS-0EA5E9?style=for-the-badge&logo=tailwindcss&logoColor=white" height="60" />
  <img src="https://img.shields.io/badge/-PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white" height="60" />
  <img src="https://img.shields.io/badge/-Prisma-0C344B?style=for-the-badge&logo=prisma&logoColor=white" height="60" />
  <img src="https://img.shields.io/badge/-Zod-3E67B1?style=for-the-badge&logoColor=white" height="60" />
  <img src="https://img.shields.io/badge/-ReactHookForm-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" height="60" />
</p>

---

## 📁 ساختار پروژه

````
Regal/
│
├─ prisma/
│ └─ schema.prisma
│
├─ public/
│ ├─ imgs/
│ └─ fonts/
│
├─ src/
│ ├─ app/
│ │ │
│ │ ├─ api
│ │ │ ├─ auth/..
│ │ │ ├─ cart/..
│ │ │ ├─ products/..
│ │ │ ├─ order/..
│ │ │ ├─ category/..
│ │ │ └─ ...
│ │ │
│ │ ├─ (home)/page.tsx
│ │ │
│ │ ├─ products/
│ │ │ ├─ page.tsx
│ │ │ ├─ components/
│ │ │ │ ├─ ProductCard.tsx
│ │ │ │ └─ ProductCard.types.ts
│ │ │ ├─ hooks/
│ │ │ │ └─ useFilter.ts
│ │ │ └─ ...
│ │ │
│ │ ├─ [id]/
│ │ │ ├─ page.tsx
│ │ │ ├─ components/
│ │ │ │ ├─ filterMenu.tsx
│ │ │ │ └─ filterMenu.types.ts
│ │ │ ├─ hooks/
│ │ │ │ └─ useFilterAction.ts
│ │ │ └─ ...
│ │ │
│ │ ├─ user/
│ │ │ ├─ page.tsx
│ │ │ ├─ addresses/
│ │ │ │ ├─ page.tsx
│ │ │ │ ├─ components/
│ │ │ │ │ ├─ AddressModal.tsx
│ │ │ │ │ └─ AddressModal.types.ts
│ │ │
│ │ └─ ...
│ │
│ ├─ components/
│ │ └─ Navbar.tsx
│ │ └─ Footer.tsx
│ │ └─ ProductCard.tsx
│ │ └─ ...
│ │
│ ├─ lib/
│ │ └─ prisma.ts
│ │
│ ├─ constants/
│ │ └─ categoryModel.ts
│ │ └─ sortItems.ts
│ │
│ ├─ types/
│ │ └─ product.ts
│ │ └─ cart.ts
│ │
│ ├─ context/
│ │ └─ AuthContext.ts
│ │ └─ CartContext.ts
│ │ └─ types.ts
│ │
│ └─ utils/
│ └─ formatPrice.ts
│
├─ package.json
├─ tsconfig.json
└─ next.config.js```
````

## 📄 مجوز

این پروژه خصوصی و متعلق به **fatemedivan** است. همهٔ حقوق محفوظ است.
