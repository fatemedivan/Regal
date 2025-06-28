// prisma/seed.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log(
    "Starting seeding process for 6 discounted formal wear products (single color with hex code)..."
  );

  // --- Seed Categories and Subcategories ---
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

  // --- Seed Products with Hex Color Code ---
  const productsData = [
    {
      name: "لباس مجلسی دکلته الی",
      description:
        "دامن مجلسی کلوش با پارچه ساتن براق، انتخابی ایده‌آل برای ست کردن با شومیزهای مجلسی. فروش محدود!",
      price: 750000,
      discountedPrice: 600000,
      isDiscounted: true,
      imageUrl: "/img/product-off-1.png",
      color: ["#800080"], // ✅ کد هگز به جای نام رنگ
      size: "Free Size",
      categoryName: "پیراهن شب",
    },
    {
      name: "پیراهن شب گیپور",
      description:
        "پیراهن شب بلند تمام گیپور با آستر، بسیار شیک و مجلل. آف ویژه آخر فصل!",
      price: 2200000,
      discountedPrice: 1000000,
      isDiscounted: true,
      imageUrl: "/img/product-off-2.png",
      color: ["#8B0000"], // ✅ کد هگز
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
      color: ["#006400"], // ✅ کد هگز
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
      color: ["#C0C0C0"], // ✅ کد هگز
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
          color: productData.color, // ✅ فیلد color مستقیم از productData می‌آید
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
          color: productData.color, // ✅ فیلد color مستقیم از productData می‌آید
          size: productData.size,
          categoryId: category.id,
        },
      });
      console.log(
        `Product created or updated: ${product.name} (Category: ${productData.categoryName}, Color: ${product.color}, ID: ${product.id})`
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
  });