// prisma/seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting category and subcategory seeding...');

  // 1. تعریف دسته‌بندی‌های اصلی
  const mainCategories = [
    "لباس مجلسی",
    "شلوار",
    "سرهمی",
    "کت مجلسی",
    "دامن",
    "شومیز",
    "کراپ",
    "پالتو"
  ];

  const createdMainCategories = {}; // برای ذخیره دسته‌بندی‌های ساخته شده و ID آن‌ها

  for (const categoryName of mainCategories) {
    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });
    createdMainCategories[categoryName] = category; // ID دسته‌بندی را ذخیره می‌کنیم
    console.log(`Main Category created or found: ${category.name} (ID: ${category.id})`);
  }

  // 2. تعریف زیردسته‌بندی‌ها و اضافه کردن آن‌ها
  const subcategoriesToAdd = [
    { parentName: "لباس مجلسی", name: "پیراهن شب" },
    { parentName: "لباس مجلسی", name: "مانتو مجلسی" },
    { parentName: "لباس مجلسی", name: "دامن مجلسی" },

    { parentName: "شلوار", name: "شلوار جین" },
    { parentName: "شلوار", name: "شلوار پارچه‌ای" },
    { parentName: "شلوار", name: "لگینگ" },

    { parentName: "سرهمی", name: "سرهمی روزمره" },
    { parentName: "سرهمی", name: "سرهمی مجلسی" },
    { parentName: "سرهمی", name: "جامپسوت" },

    { parentName: "کت مجلسی", name: "کت تک" },
    { parentName: "کت مجلسی", name: "کت و شلوار" },
    { parentName: "کت مجلسی", name: "جلیقه" },

    { parentName: "دامن", name: "دامن کوتاه" },
    { parentName: "دامن", name: "دامن بلند" },
    { parentName: "دامن", name: "دامن میدی" },

    { parentName: "شومیز", name: "شومیز رسمی" },
    { parentName: "شومیز", name: "شومیز کژوال" },
    { parentName: "شومیز", name: "بلوز" },

    { parentName: "کراپ", name: "تاپ کراپ" },
    { parentName: "کراپ", name: "هودی کراپ" },
    { parentName: "کراپ", name: "تی‌شرت کراپ" },

    { parentName: "پالتو", name: "پالتو بلند" },
    { parentName: "پالتو", name: "پالتو کوتاه" },
    { parentName: "پالتو", name: "کاپشن" },
  ];

  for (const subcategoryInfo of subcategoriesToAdd) {
    const parentCategory = createdMainCategories[subcategoryInfo.parentName];
    if (parentCategory) {
      const subcategory = await prisma.category.upsert({
        where: { name: subcategoryInfo.name }, // نام زیردسته‌بندی باید منحصر به فرد باشد
        update: { parentId: parentCategory.id }, // اگر وجود داشت، فقط parentId را آپدیت کن
        create: {
          name: subcategoryInfo.name,
          parentId: parentCategory.id,
        },
      });
      console.log(`Subcategory created or found: ${subcategory.name} (Parent: ${subcategoryInfo.parentName}, ID: ${subcategory.id})`);
    } else {
      console.warn(`Parent category "${subcategoryInfo.parentName}" not found for subcategory "${subcategoryInfo.name}".`);
    }
  }

  console.log('Category and subcategory seeding complete!');
}

main()
  .catch(async (e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });