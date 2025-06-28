// prisma/seed.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log(
    "Starting seeding process for 6 discounted formal wear products..."
  );

  // --- Seed Categories and Subcategories ---
  // این بخش دسته‌بندی‌های اصلی رو می‌سازه.
  const mainCategories = [
    "لباس مجلسی",
    "شلوار",
    "سرهمی",
    "کت مجلسی",
    "دامن",
    "شومیز",
    "کراپ",
    "پالتو",
  ];
  const createdCategories = {};

  for (const categoryName of mainCategories) {
    const category = await prisma.category.upsert({
      where: { name: categoryName },
      update: {},
      create: { name: categoryName },
    });
    createdCategories[categoryName] = category;
    console.log(
      `Main Category created or found: ${category.name} (ID: ${category.id})`
    );
  }

  // این بخش زیردسته‌بندی‌ها رو می‌سازه و ID اون‌ها رو هم ذخیره می‌کنه.
  const subcategoriesToAdd = [
    { parentName: "لباس مجلسی", name: "پیراهن شب" },
    { parentName: "لباس مجلسی", name: "مانتو مجلسی" },
    { parentName: "لباس مجلسی", name: "دامن مجلسی" },
    { parentName: "شلوار", name: "شلوار جین" },
    { parentName: "شلوار", name: "شلوار پارچه‌ای" },
    { parentName: "شلوار", name: "لگینگ" },
    { parentName: "سرهمی", name: "سرهمی روزمره" },
    { parentName: "سرهمی", name: "سرهمی مجلسی" },
    { parentName: "جامپسوت", name: "جامپسوت رسمی" },
    { parentName: "کت مجلسی", name: "کت تک" },
    { parentName: "کت مجلسی", name: "کت و شلوار" },
    { parentName: "کت مجلسی", name: "ژیله" },
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
    const parentCategory = createdCategories[subcategoryInfo.parentName];
    if (parentCategory) {
      const subcategory = await prisma.category.upsert({
        where: { name: subcategoryInfo.name },
        update: { parentId: parentCategory.id },
        create: {
          name: subcategoryInfo.name,
          parentId: parentCategory.id,
        },
      });
      // ذخیره زیردسته‌بندی‌ها در createdCategories تا محصولات بتونن به اون‌ها ارجاع بدن.
      createdCategories[subcategoryInfo.name] = subcategory;
      console.log(
        `Subcategory created or found: ${subcategory.name} (Parent: ${subcategoryInfo.parentName}, ID: ${subcategory.id})`
      );
    } else {
      console.warn(
        `Parent category "${subcategoryInfo.parentName}" not found for subcategory "${subcategoryInfo.name}".`
      );
    }
  }
  console.log("Category and subcategory seeding complete.");

  // --- فقط 6 محصول تخفیف‌دار از دسته‌بندی "لباس مجلسی" ---
  const productsData = [
    {
      name: "لباس مجلسی دکلته الی",
      description:
        "دامن مجلسی کلوش با پارچه ساتن براق، انتخابی ایده‌آل برای ست کردن با شومیزهای مجلسی. فروش محدود!",
      price: 750000,
      discountedPrice: 600000,
      isDiscounted: true,
      imageUrl: "/img/product-off-1.png",
      color: "بنفش",
      size: "Free Size",
      categoryName: "پیراهن شب",
    },
    {
      name: "پیراهن شب گیپور",
      description:
        "پیراهن شب بلند تمام گیپور با آستر، بسیار شیک و مجلل. آف ویژه آخر فصل!",
      price: 2200000,
      discountedPrice: 1100000,
      isDiscounted: true,
      imageUrl: "/img/product-off-2.png",
      color: "زرشکی",
      size: "S",
      categoryName: "پیراهن شب",
    },
    {
      name: "لباس مجلسی میدی",
      description:
        "مانتو مجلسی مخمل با یقه فانتزی، مناسب فصول سرد و مجالس رسمی. تخفیف استثنایی!",
      price: 1500000,
      discountedPrice: 1200000,
      isDiscounted: true,
      imageUrl: "/img/product-off-3.png",
      color: "سبز تیره",
      size: "XL",
      categoryName: "پیراهن شب",
    },
    {
      name: "پیراهن مجلسی توری",
      description:
        "دامن مجلسی کوتاه از جنس تور لمه با آستر، مناسب مهمانی‌های غیررسمی. حراج ویژه!",
      price: 600000,
      discountedPrice: 400000,
      isDiscounted: true,
      imageUrl: "/img/product-off-4.png",
      color: "نقره‌ای",
      size: "M",
      categoryName: "پیراهن شب",
    },
  ];

  for (const productData of productsData) {
    const category = createdCategories[productData.categoryName];
    if (category) {
      const product = await prisma.product.upsert({
        where: { name: productData.name },
        update: {
          description: productData.description,
          price: productData.price,
          discountedPrice: productData.discountedPrice || null,
          isDiscounted: productData.isDiscounted || false,
          imageUrl: productData.imageUrl || null,
          color: productData.color || null,
          size: productData.size || null,
          categoryId: category.id,
        },
        create: {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          discountedPrice: productData.discountedPrice,
          isDiscounted: productData.isDiscounted,
          imageUrl: productData.imageUrl,
          color: productData.color,
          size: productData.size,
          categoryId: category.id,
        },
      });
      console.log(
        `Product created or updated: ${product.name} (Category: ${productData.categoryName}, ID: ${product.id})`
      );
    } else {
      console.warn(
        `Category "${productData.categoryName}" not found for product "${productData.name}". Skipping product.`
      );
    }
  }

  console.log("6 discounted formal wear products seeding complete!");
}

main()
  .catch(async (e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })
